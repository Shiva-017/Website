import{j as n}from"./jsx-runtime-CbkKSL4Y.js";function s(t){const e={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...t.components},{Embed:r}=e;return r||o("Embed",!0),n.jsxs(n.Fragment,{children:[n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:`title: You (probably) don't need CSS-in-JS\r
abstract: Vanilla CSS is good now actually. Here's a couple nifty techniques for dynamically styling React components with CSS custom properties.\r
date: '2022-05-01'\r
banner: /static/modern-styling-in-react-banner.jpg\r
featured: true`}),`
`,n.jsxs(e.p,{children:["When I first tried CSS-in-JS libraries like ",n.jsx(e.a,{href:"https://styled-components.com/",children:"Styled Components"})," and ",n.jsx(e.a,{href:"https://emotion.sh",children:"Emotion"}),", the thing that felt right about it was passing values or state directly into the styles for a component. It really closed the loop with the concept of React where the UI is a function of state. While this was a definite advancement over the traditional way of styling React with classes and pre-processed CSS, it still had its problems."]}),`
`,n.jsx(e.p,{children:"To highlight some examples, I'll break down some typical examples using two main types of dynamic styles you'll run into with React components:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Values:"})," like a color, delay, or position. Anything that represents a single value for a CSS property."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"States:"})," like a primary button variant, or a loading state each having their own set of associated styles."]}),`
`]}),`
`,n.jsx(e.h2,{children:"Where we are today"}),`
`,n.jsxs(e.p,{children:["Before we get started, for comparison I'll be using SCSS (with ",n.jsx(e.a,{href:"https://css-tricks.com/bem-101/",children:"BEM syntax"}),") and Styled Components in my examples for how styling is typically approached in React. I won't cover CSS-in-JS libraries that deal with writing CSS as JavaScript objects. I think there are already good solutions out there (I'd recommend ",n.jsx(e.a,{href:"https://vanilla-extract.style/",children:"Vanilla Extract"}),") if you prefer having type checking and living more fully on the JavaScript side of things. My solution is more for those of us that like writing CSS as CSS, but want to respond to the reactivity and state of components in a better way."]}),`
`,n.jsxs(e.p,{children:["If you're already familiar with the problem, ",n.jsx(e.a,{href:"#theres-a-better-way-vanilla-css",children:"skip to the solution"}),"."]}),`
`,n.jsx(e.h3,{children:"Values"}),`
`,n.jsxs(e.p,{children:["Using vanilla CSS, or pre-processed CSS by means of LESS or SCSS, the traditional way of passing a ",n.jsx(e.em,{children:"value"})," to your styles on was to just use inline styles. So if we have a button component that allows a color, it would look something like this:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function Button({ color, children }) {\r
  return (\r
    <button className="button" style={{ backgroundColor: color }}>\r
      {children}\r
    </button>\r
  );\r
}
`})}),`
`,n.jsx(e.p,{children:"The problem with this approach is that it brings with it all the problems of inline styles. It now has higher specificity making it harder to override, and the styles aren't co-located with the rest of our button styles."}),`
`,n.jsx(e.p,{children:"CSS-in-JS (in the case of Styled Components or Emotion) solved this problem by allowing dynamic values like this to be directly as props"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// We can pass the \`color\` value into the styled component as a prop\r
function Button({ color, children }) {\r
  return <StyledButton color={color}>{children}</StyledButton>;\r
}\r
\r
// The syntax is a little funky, but now in the styled component's styles\r
// we can use its props as a function\r
const StyledButton = styled.button\`\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: \${props => props.color};\r
\`;
`})}),`
`,n.jsx(e.h3,{children:"States"}),`
`,n.jsx(e.p,{children:"Traditionally, we'd use css classes and concatenate strings. This always felt messy and clunky, but it works nicely on the css side, particularly if you're using a naming convention like BEM along with a pre-processors. Say we have small, medium, and large button sizes, and a primary variant, it might look something like this:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function Button({ color, size, primary, children }) {\r
  return (\r
    <button\r
      className={['button', \`button--\${size}\`, primary ? 'button--primary' : null]\r
        .filter(Boolean)\r
        .join(' ')}\r
      style={{ backgroundColor: color }}\r
    >\r
      {children}\r
    </button>\r
  );\r
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-scss",children:`.button {\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: whitesmoke;\r
\r
  &--primary {\r
    background-color: $primary-color;\r
  }\r
\r
  &--small {\r
    height: 30px;\r
  }\r
\r
  &--medium {\r
    height: 40px;\r
  }\r
\r
  &--large {\r
    height: 60px;\r
  }\r
}
`})}),`
`,n.jsx(e.p,{children:"The SCSS is looking nice and clean. I've always liked the pattern of using nesting to concatenate elements and modifiers in SCSS using the BEM syntax."}),`
`,n.jsxs(e.p,{children:["Our JSX, however, isn't faring so well. That string concatenation on the ",n.jsx(e.code,{children:"className"})," in the is a mess. The size property isn't too bad, because we're appending the value directly onto the class. The primary variant though... yuck. Not to mention the wacky ",n.jsx(e.code,{children:"filter(Boolean)"})," in there to prevent a double space in the class list for non-primary buttons. There are better ways of handling this, for example the ",n.jsx(e.code,{children:"classnames"})," package on NPM. But they only make the problem marginally more bearable."]}),`
`,n.jsx(e.p,{children:"Unlike dynamic values, Styled Components is still a bit cumbersome in dealing with states"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function Button({ color, size, primary, children }) {\r
  return \r
    <StyledButton color={color}>{children}</StyledButton>\r
  }\r
const StyledButton = styled.button\`\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: whitesmoke;\r
\r
  \${props => props.primary && css\`\r
    background-color: $primary-color;\r
  \`}\r
\r
  \${props => props.size === 'small' && css\`\r
    height: 30px;\r
  \`}\r
\r
  \${props => props.size === 'medium' && css\`\r
    height: 40px;\r
  \`}\r
\r
  \${props => props.size === 'large' && css\`\r
    height: 60px;\r
  \`}\r
\`;
`})}),`
`,n.jsxs(e.p,{children:["It's not ",n.jsx(e.em,{children:"terrible"}),", but the repeated functions to grab props gets repetitive and makes reading styles quite noisy. It can also get way worse depending on the type of state. If you have separate but mutually exclusive states sometimes it calls for a ternary expression that can end up looking even more convoluted and difficult to parse."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`const StyledButton = styled.button\`\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
\r
  \${props =>\r
    props.primary\r
      ? css\`\r
          height: 60px;\r
          background-color: darkslateblue;\r
        \`\r
      : css\`\r
          height: 40px;\r
          background-color: whitesmoke;\r
        \`}\r
\`;
`})}),`
`,n.jsx(e.p,{children:"If you're using Prettier for code formatting like I do, you'll end up with a monstrosity like you see above. Monstrosity is a strong way of putting it, but I find the indentation and formatting really difficult to read."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{children:"There's a better way: vanilla CSS"}),`
`,n.jsx(e.p,{children:"The solution was with us all along: CSS custom properties (AKA CSS variables). Well, not really. When the methods I've covered above were established, CSS custom properties weren't that well supported by browsers. Support these days is pretty much green across the board (unless you still need to support ie11)."}),`
`,n.jsxs(e.p,{children:["After making the journey through using SCSS to Styled Components, I've come full circle back to vanilla CSS. I feel like there's an emerging trend of sticking more to platform standards with frameworks like Remix and Deno adhering closer to web standards instead of doing their own thing. I think this will happen with CSS as well, we won't need to reach for pre-processors and CSS-in-JS libraries as much because the native features are becoming ",n.jsx(e.em,{children:"better"})," than what they have to offer."]}),`
`,n.jsx(e.p,{children:"That being said, here's how I've approached styling React components with vanilla CSS. Well, mostly vanilla CSS. I'm using postcss to get support some up and coming features like native nesting and custom media queries. The beauty of postcss is that as browsers support new features, the tooling slowly melts away."}),`
`,n.jsx(e.h3,{children:"Values"}),`
`,n.jsx(e.p,{children:"A really neat trick I've found for passing values into css is using custom properties. It's pretty simple, we can just drop variables into the style property and it works."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function Button({ color, children }) {\r
  return (\r
    <button className="button" style={{ '--color': color }}>\r
      {children}\r
    </button>\r
  );\r
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.button {\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: var(--color);\r
}
`})}),`
`,n.jsxs(e.p,{children:[`Now you might be thinking "isn't this just inline styles with extra steps?", and while we are using inline styles to apply the variable, it doesn't come with the same downsides. For one, there's no specificity issue because we're declaring the property under the `,n.jsx(e.code,{children:".button"})," selector in the css file. Secondly, all our styles are co-located, it's just the value of the custom property that's being passed down."]}),`
`,n.jsx(e.p,{children:"This also makes it really convenient when working with properties like transforms or clip-paths where you only need to dynamically control one piece of the value"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`// All we need to pass is the value needed by the transform, rather than\r
// polluting our jsx with the full transform in the inline style\r
function Button({ offset, children }) {\r
  return (\r
    <button className="button" style={ '--offset': '{{ offset }}' }>\r
      {children}\r
    </button>\r
  );\r
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.button {\r
  border: 0;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: whitesmoke;\r
  transform: translate3d(0, var(--offset), 0);\r
}
`})}),`
`,n.jsxs(e.p,{children:[`There's way more you can do with CSS custom properties, like setting defaults and allowing overrides from the cascade for any components that compose one another to hook into, like a "CSS API". `,n.jsx(e.a,{href:"https://lea.verou.me/2021/10/custom-properties-with-defaults/",children:"This article from Lea Verou"})," does a great job at explaining this technique."]}),`
`,n.jsx(e.h3,{children:"States"}),`
`,n.jsxs(e.p,{children:["The best way I've found to deal with component states and variants with vanilla CSS is using data attributes. What I like about this is that it pairs nicely with the upcoming native CSS nesting syntax. The old technique of targeting BEM modifiers with ",n.jsx(e.code,{children:"&--modifier"})," doesn't work like it does in pre-processors. But with data attributes, we get similar ergonomics"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`function Button({ color, size, primary, children }) {\r
  return (\r
    <button className="button" data-size={size} data-primary={primary}>\r
      {children}\r
    </button>\r
  );\r
}
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.button {\r
  border: 0;\r
  border-radius: 4px;\r
  padding: 8px 12px;\r
  font-size: 14px;\r
  color: dimgrey;\r
  background-color: whitesmoke;\r
\r
  &[data-primary='true'] {\r
    background-color: var(--colorPrimary);\r
  }\r
\r
  &[data-size='small'] {\r
    height: 30px;\r
  }\r
\r
  &[data-size='medium'] {\r
    height: 40px;\r
  }\r
\r
  &[data-size='large'] {\r
    height: 60px;\r
  }\r
}
`})}),`
`,n.jsx(e.p,{children:"Have a play with the example button component here:"}),`
`,n.jsx(r,{src:"https://stackblitz.com/edit/vitejs-vite-mjs1oh?embed=1&file=src/Button/Button.jsx"}),`
`,n.jsxs(e.p,{children:["This looks similar to how modifiers are written using BEM syntax. It's also much more straightforward and easy to read than the Styled Components function syntax. The one downside is that we do gain a level of specificity that we don't with BEM modifiers using the ",n.jsx(e.code,{children:"&--modifier"})," pattern, but I think that's an acceptable tradeoff."]}),`
`,n.jsxs(e.p,{children:["It may seem kinda ",n.jsx(e.em,{children:"weird"})," at first to use data attributes for styling, but it gets around the problem of messy string concatenation using classes. It also mirrors how we can target accessibility attributes for interaction-based styling, for example:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.button {\r
  &[aria-pressed='true'] {\r
    background-color: gainsboro;\r
  }\r
\r
  &[disabled] {\r
    opacity: 0.4;\r
  }\r
}
`})}),`
`,n.jsxs(e.p,{children:["I like this approach because it helps structure styling, we can see that any class is styling the base element, andy any attribute is styling a state. As for avoiding style clashes, there are better options now that automate the process like ",n.jsx(e.a,{href:"https://github.com/css-modules/css-modules",children:"CSS Modules"})," which is included out of the box in most React frameworks like Next.js and Create React App."]}),`
`,n.jsxs(e.p,{children:["Of course, these techniques don't require you to ",n.jsx(e.em,{children:"only"})," use vanilla CSS, you can just as easily combine them with CSS-in-JS or a pre-processor. However with new features like ",n.jsx(e.a,{href:"https://www.w3.org/TR/css-nesting-1/",children:"nesting"})," and ",n.jsx(e.a,{href:"https://www.w3.org/TR/css-color-5/#relative-colors",children:"relative colors"})," I think it's becoming less necessary to reach for these tools."]}),`
`,n.jsxs(e.p,{children:["The entirety of this website is styled using these techniques, so if you want to see an example of how this applies to some real components, take a gander at the ",n.jsx(e.a,{href:"https://github.com/HamishMW/portfolio",children:"source code"}),"."]})]})}function a(t={}){const{wrapper:e}=t.components||{};return e?n.jsx(e,{...t,children:n.jsx(s,{...t})}):s(t)}function o(t,e){throw new Error("Expected "+(e?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default};
