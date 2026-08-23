import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
  <h4>{props.text} {props.total}</h4> 
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = (good + neutral + bad)
  const average = (good * 1 + neutral * 0 + bad * -1)/ all
  const positive = ((good / all) * 100) + ' %'

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>

      <h1>Statistics</h1>
      <Display text='good' total={good}/>
      <Display text='neutral' total={neutral}/>
      <Display text='bad' total={bad}/>
      <Display text='all' total={all}/>
      <Display text='average' total={average}/>
      <Display text='positive' total={positive}/>
    </div>
  )
}

export default App