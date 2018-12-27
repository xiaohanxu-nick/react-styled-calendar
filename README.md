# react-styled-calendar
A simple react Datepicker component built with [styled-components](https://www.styled-components.com/) and [date-fns](https://date-fns.org/)
## DEMO
![demo](./demo/demo.gif)

With TimeSelector

![TimeSelector](./demo/showTimeSelector.gif)

[DEMO online](https://codesandbox.io/s/pp6rv97oz0)
## Installation

```javascript
npm install react-styled-calendar --save
```


## Example Usage

```javascript
import react from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-styled-calendar';


function App() {
  return (
    <div>
      <Calendar />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## API

name | type | default | description 
---- | ---- | ------- | -----------
showTimeSelector | boolean | false | control the display of TimeSelector Component