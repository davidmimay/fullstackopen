import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const all = (props.good + props.neutral + props.bad)

  if (all === 0) {
    console.log('No feedback', props)
    return (
      <p><i>No feedback given</i></p>
    )
  }

  const average = ((props.good * 1 + props.neutral * 0 + props.bad * -1)/ all).toFixed(1)
  const positive = ((props.good / all) * 100).toFixed(1) + ' %'

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={average}/>
        <StatisticLine text='positive' value={positive}/>
      </tbody>
    </table>
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