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

const Total = (props) => <p><strong>Total of {props.total} exercises</strong></p>

export default Course