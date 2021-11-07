# Input fields for vue.js

documentation:  https://gaidadei.ru/inputv  
npm:  https://gaidadei.ru/inputv  
how install: https://www.youtube.com/watch?v=TmmegP511ts  

# Description
Very simple vuejs component that creates custom input fileds. Where can you create input fields for phone number, text, select, checkbox and radio ...  
![prev1](https://user-images.githubusercontent.com/43887554/140640024-2d2fbce8-6944-47ef-9aac-95a82c064239.gif)

# How to install

## 1 step
Write the command
```
npm i @vgaidadei/inputv
```

## 2 step
In the .vue file, which you will use the fields, connect the library using the line
```
import inputv from '@vgaidadei/input'
```

## 3 step
Connect the component by adding it to the object for export
```
export default {
... ,
components: { inputv },
...
}
```

## 4 step
Inside the template, insert the inputV tag where needed
```
<div id='app'>
  <inputV type='tel'>
</div>
```

![prev1](https://user-images.githubusercontent.com/43887554/140640398-3357b445-d1d3-4472-acea-0aee186606aa.gif)
![prev2](https://user-images.githubusercontent.com/43887554/140640385-423e54bf-1de7-45f6-a954-57b9f5331f3e.gif)
![prev3](https://user-images.githubusercontent.com/43887554/140640388-77b67138-93dc-4e31-a6e3-6c5e788a6f25.gif)
![prev4](https://user-images.githubusercontent.com/43887554/140640390-742ea71e-a1a5-4c0b-93fe-456d5d68e307.gif)
![prev5](https://user-images.githubusercontent.com/43887554/140640391-396e82af-46ae-466f-b3c7-13824c24da4b.gif)
