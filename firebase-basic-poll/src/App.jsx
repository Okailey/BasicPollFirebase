import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function App() {

  //inputs and answers
  const [input, setInput] = useState('')
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "responseToPolls"))
        const data = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setAnswers(data)
        console.log(data);
      } catch (error) {
        console.error("Sorry, try again: ", error);
      }
    };

    fetchData();
  }, [])

  //get a new input from user

  const getNewInput = async (e) => {
    e.preventDefault() //doesnt allow refresh

    //points user in the right direction with inputs
    if (input.trim() === '') {
      alert("Please enter a response before submitting.")
      return
    }

    //then we try to add it to the doc and have its upvotes be 0 for others to add an upvote
    try {
      await addDoc(collection(db, "responseToPolls"), {
        text: input.trim(),
        upvotes: 0
      })


      setInput("")
      const querySnapShot = await getDocs(collection(db, "responseToPolls"))
      const data = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setAnswers(data)
      console.log(data);
    } catch (error) {
      console.error("Sorry, try again: ", error);
    }
  }


  //adding the upvoting function where users can +1 to a response they see

  const upvoteAnswer = async (id, currVotes) => {
    try {
      const uppedVotes = doc(db, "responseToPolls", id)
      await updateDoc(uppedVotes, {
        upvotes: currVotes + 1
      })

      const querySnapShot = await getDocs(collection(db, "responseToPolls"))
      const data = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setAnswers(data)
      console.log(data);
    } catch (error) {
      console.error("Sorry, could not upvote ", error);
    }
  }


  //hardcode question and allow for a form so they can submit - using MUI and sort the answers based on n0 of upvotes
  return (
    <div className="polls">
      <h1> What is your favorite sports to watch?</h1>

      <form onSubmit={getNewInput} className="pollInput" >
        <TextField
          label="Did not see your answer? Add it now :)"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="contained" className="pollButton">  Add
        </Button>
      </form>

      <>
        {answers
          .sort((a, b) => b.upvotes - a.upvotes)
          .map(answer => (
            <li key={answer.id} className="poll-item">
              {answer.text} — {answer.upvotes} upvotes
              <button onClick={() => upvoteAnswer(answer.id, answer.upvotes)}>Upvote</button>
            </li>
          ))}
      </>
    </div >
  )
}

export default App
