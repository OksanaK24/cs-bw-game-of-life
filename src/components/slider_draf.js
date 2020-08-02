// import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';

// function valueLabelFormat(value) {
//   const [coefficient, exponent] = value
//     .toExponential()
//     .split('e')
//     .map((item) => Number(item));
//   return `${Math.round(coefficient)}e^${exponent}`;
// }

// export default function NonLinearSlider() {
//   const [value, setValue] = React.useState(1);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <Typography id="non-linear-slider" gutterBottom>
//         Temperature range
//       </Typography>
//       <Slider
//         value={value}
//         min={0}
//         step={0.1}
//         max={6}
//         scale={(x) => x ** 10}
//         getAriaValueText={valueLabelFormat}
//         valueLabelFormat={valueLabelFormat}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         aria-labelledby="non-linear-slider"
//       />
//     </div>
//   );
// }

import React, {useState} from 'react';
import Slider from 'react-input-slider';

export default function App() {
  const [state, setState] = useState({ x: 10, y: 10 });

  return (
    <div>
      ({state.x}, {state.y})
      <Slider axis="xy" x={state.x} y={state.y} onChange={setState} />
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => setState(state => ({ ...state, x }))}
      />
      <Slider axis="y" y={state.y} onChange={({ y }) => setState(state => ({ ...state, y }))} />
    </div>
  );
}