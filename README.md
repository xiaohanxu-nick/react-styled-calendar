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
showTimeSelector | boolean | false | control the display of the TimeSelector 
showConfirmButton | boolean | true | control the display of the Confirm Button
showCancelButton | boolean | true | control the display of the Cancel Butto
formatWeek | string | 'dddd' | A string used to override the default formattting of the weekday in the Calendar Header
formatMonthYear | string | 'MMMM YYYY' | A string used to override the default formatting of the month and year in  Calendar Header
formatDateInput | string | 'YYYY-MM-DD HH:mm' | A string used to specify the format of the date in dateinput component
confirmButtonMessage | string | 'Confirm' | A string specify the message shows up at the confirm button
cancelButtonMessage | string | 'Cancel' | A string specify the message shows up at the cancel button
timeSelectorHeader | string | 'Pick Up A Time ! | A string specify the content of the header of the time selector header