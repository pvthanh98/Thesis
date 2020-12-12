## Class-based components
```javascript
class HelloReact extends React.components {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>Hello React </div>
    );
  }
}
```

## Functional Components
```javascript
const HelloReact = (props) => {
  return (
    <div>Hello React </div>
  )
}
```

## JSX
```javascript
const HelloReact = (props) => {
  return (
    <div>
      <h4>Hello JSX</h4>
      <p>
        this is JSX element, so similiar to HTML synxtax
      </p>
    </div>
  )
}
```
