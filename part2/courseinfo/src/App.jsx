const Course = (props) => {
  console.log('Course works', props.course);
  const totalExercises = props.course.parts.reduce(
    (sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total total={totalExercises}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  console.log('Content works', props.parts);
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Total of {props.total} exercises</p>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App