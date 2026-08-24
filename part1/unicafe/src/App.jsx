import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
  <h4>{props.text} {props.total}</h4> 
)

const Statistics = (props) => {
  const all = (props.good + props.neutral + props.bad)

  if (all === 0) {
    console.log('No feedback', props)
    return (
      <p><i>No feedback given</i></p>
    )
  }

  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1)/ all
  const positive = ((props.good / all) * 100) + ' %'

  return (
    <div>
      <Display text='good' total={props.good}/>
      <Display text='neutral' total={props.neutral}/>
      <Display text='bad' total={props.bad}/>
      <Display text='all' total={all}/>
      <Display text='average' total={average}/>
      <Display text='positive' total={positive}/>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>

      <h1>Statistics</h1>
      <Statistics
        good={good} 
        neutral={neutral} 
        bad={bad}
      />
    </div>
  )
}

export default App