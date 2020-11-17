# 🧰 Website Toolbox 🛠
A dead-simple framework for dealing with all sorts of "website things". This framework is particularly helpful when you're doing things like:

- Dealing directly with the DOM
- Upgrading old jQuery code to `currentYear`
- Spinning up a quick [codepen](https://codepen.io/trending)
- Adding functionality to Wordpress, Shopify, HubSpot, and other marketing, brochure & e-commerce sites
- Re~~heating~~writing some old spaghetti

## Why It's Good
Sometimes, you can't ([or shouldn't!](https://dev.to/gypsydave5/why-you-shouldnt-use-a-web-framework-3g24)) use a full-sized framework like Vue or React. This happens typically when developing something like a Shopify or Wordpress theme, although there are quite a few other cases where you'd need something that provides a little structure to the JavaScript that typically gets written in this environment. 

The Website Toolbox provides some structure and opinion about how your classic "website JS" code is written and implemented. Of course, it's possible you may need something that does *more*. But this framework is for when you *don't*.

That's not to say this framework is primitive -- it still has cool stuff like:

- Reactive data properties
- Lifecycle hooks
- Reference to the parent scope/context using the `this` keyword (similar to the way `this` is handled in VueJS)
- Cross-component communication (in development)
- Custom plugin & mixin integration (in development)
- Helpful methods like `resize()`, `updated()` and `inView()` (in development)

But it doesn't do client-side routing, it probably won't be used for complex state management, and it doesn't have a virtual DOM. *But you don't always need that stuff*. 

Here's an example of what's currently possible with the `Component` class:
```js
import { Component } from 'website-toolbox';

// A simple and familiar API
const carousel = new Component({
  name: 'HomepageCarousel',

  // nothing gets mounted, this just gets `document.querySelector`'d for you
  root: '.carousel',

  // these are all queried relative to the root element
  nodes: {
    headline: '.some-headline', // querySelector
    buttons: ['.some-button'], // querySelectorAll
  },

  data: {
    /**
     * Must declare initial state, even if null or falsy. Otherwise, you'll
     * get barked at. This enforces that all variables must be declared 
     * before use.
     * */
    currentSlide: 0,
    delay: 1500,
  },

  // think "lifecycle hooks", not React hooks
  hooks() {
    // like a `componentDidMount` or `useEffect(() => {}, [])`
    setup() {
      // the `Component` instance is available as `this`
      this.methods.attachEventListeners();
    },

    // Called immediately after anything in `Component.data` is updated 
    updated(newVal, oldVal, key) {
      /**
       * `newVal` & `oldVal` are the current & previous values of the
       * updated data prop, respectively
       * 
       * `key` is the keyname of the property that updated, so you can do 
       * `this.data[key]` to track a specific data prop for changes.
       * */
    }
  },

  methods: {
    attachEventListeners() {
      const submitButton = this.nodes.buttons[0];
      submitButton.addEventListener('click', () => 'Submitted!');
    },
  },

});
```
## Testing
Testing with Jest in `tests/`. To run tests:
```
npm run test // test: jest
```

## Building
```
npm run build // build: rollup --config
```