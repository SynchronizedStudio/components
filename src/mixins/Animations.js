import { gsap } from 'gsap';
import _each from 'lodash/each'
import _get from 'lodash/get'
import _isNaN from 'lodash/isNaN'
import _isNumber from 'lodash/isNumber'
import _has from 'lodash/has'
import _merge from 'lodash/merge'


const Animations = {
    data: () => ({
        tweens: [],

        defaultEase: 'Power4.easeOut',

        defaults: {
            opacity: {
                from: 0,
                to: 1,
                dur: 1
            },
            y: {
                from: 50,
                to: 0,
                dur: 1.6,
                ease: 'Power3.easeOut'
            },
            x: {
                from: 200,
                to: 0,
                dur: 1.8,
                ease: 'Power4.easeOut'
            },
            scale: {
                from: 1.4,
                to: 1,
                dur: 1.6,
                ease: 'Power2.easeOut'
            },
            rotation: {
                from: 10,
                to: 0,
                dur: 1.6,
                ease: 'Power2.easeOut'
            },
            // clipPath: {
            //     from: 'polygon(30% 10%, 70% 10%, 70% 90%, 30% 90%)',
            //     to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            //     ease: 'Power4.easeInOut',
            //     dur: 2
            // },
        },

        presets: {

            'opacity,y': {
                fromopacity: 0,
                toopacity: 1,
                fromy: 90,
                toy: 0,
                dur: 1.4,
                ease: 'Power3.easeOut'
            },

            'opacity,y,rotate': {
                fromopacity: 0,
                toopacity: 1,
                fromy: 90,
                toy: 0,
                fromrotate: 4,
                torotate: 0,
                dur: 1.4,
                ease: 'Power3.easeOut'
            },

            'scale,y': {
                fromscale: 3,
                toscale: 1,
                fromy:-100,
                toy: 0,
                dur: 1
            },
            'opacity,x': {
                fromopacity: 0,
                toopacity: 1,
                fromx: 150,
                tox: 0,
                dur: 1.8,
                ease: 'Power3.easeOut'
            },
            'opacity,scale': {
                fromscale: 1.2,
                toscale: 1,
                fromopacity: 0,
                toopacity: 1,
                dur: 1.4,
                ease: 'Power3.easeOut'
            }
        }
    }),

    computed: {
          animationDelay()  {
              return this.$store.getters['app/getState']('animationDelay')
          }
    },

    methods: {
        toggleAnimations(options) {
            let el = options.el || this.$el
            let elemsToAnimate = el.querySelectorAll('.should-animate')
            this.runAnimation(elemsToAnimate, options.visible)
        },

        setAnimationObjects(obj, prop, visible, notInstant){

            // dafault values for the specific property
            let defaultValues = this.defaults[prop]

            // setting the duration - data or preset values else default dur
            let dur = visible || notInstant ? _get(obj, 'dur') * 1 || _get(defaultValues, 'dur') : 0

            let from, to

            if(prop == 'clipPath'){

                let dataFrom = obj['from' + prop]
                let dataTo = obj['to' + prop]

                from = dataFrom || _get(defaultValues, 'from')
                to = dataTo || _get(defaultValues, 'to')

            } else{                
                let dataFrom = obj['from' + prop] * 1
                let dataTo = obj['to' + prop] * 1

                from = _isNumber(dataFrom) && !_isNaN(dataFrom) ? dataFrom : _get(defaultValues, 'from')
                to = _isNumber(dataTo) && !_isNaN(dataTo) ? dataTo : _get(defaultValues, 'to')
            }


            // its depening on the animation direction
            let fromValue = visible ? from : to
            let toValue = visible ? to : from

            return {
                from: fromValue,
                to: toValue,
                dur: dur,
                ease: obj.ease,
            }
        },

        runAnimation(elems, visible, notInstant) {

            if(!elems || !elems.length){
                return
            }

            gsap.set(elems, {
                opacity: 1
            })

            if(visible){                    
                gsap.set(elems, {
                    willChange: 'transform, opacity'
                })
            }

            _each(elems, (elem) => {
                if(!elem.dataset){
                    return
                }

                let dur = 0
                let preset = elem.dataset.preset
                let presetExists = _has(this.presets, preset)

                let delay = visible  ? elem.dataset.delay * 1 : 0
                let ease = elem.dataset.ease

                let startVars = {}
                let endVars = {}

                // animation values -- preset or data values
                let animationValues = presetExists ? this.presets[preset] : elem.dataset


                // override default preset values
                if(presetExists){
                    animationValues = _merge({}, animationValues, elem.dataset)
                }

                // properties to be animated
                let propsString = preset || elem.dataset.props
                let props = propsString ? propsString.split(",") : []

                // go trough the props and set the animationObject
                _each(props, (prop) => {

                    notInstant = notInstant || elem.dataset.notInstant
                    let aniObject = this.setAnimationObjects(animationValues, prop, visible, notInstant)

                    // setting the values for the specific property
                    dur = aniObject.dur
                    ease = aniObject.ease || ease

                    startVars[prop] = aniObject.from
                    endVars[prop] = aniObject.to
                })

                endVars.delay = delay

                endVars.ease = ease || this.defaultEase
                endVars.overwrite = true
                
                startVars.transformOrigin = elem.dataset.origin || 'center center'

                if(!animationValues.notDelayed){
                    endVars.delay += this.animationDelay || 0
                }

                if(visible && !animationValues.keepProps){
                    endVars.clearProps = "transform,clipPath,transform-origin,will-change"
                }

                gsap.fromTo(elem, dur, startVars, endVars)
                
            })
        }
    }
}

export default Animations;
