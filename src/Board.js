import {useEffect, useState} from 'react'
import Card from './Card'
import "./card.css"

const INITIAL_CARD =[ {"src": "", matched: false}]
const card_imgs = [
    { "src": "/imgs/oren.jpeg", matched:false },
    { "src": "/imgs/revital.jpeg", matched:false },
    { "src": "/imgs/liroy.jpeg", matched:false },
    { "src": "/imgs/eliad.jpeg", matched:false },
    { "src": "/imgs/liel.jpeg", matched:false },
    { "src": "/imgs/eliraz.jpeg", matched:false },
    { "src": "/imgs/lidor.jpeg", matched:false },
    { "src": "/imgs/hazan.jpeg", matched:false }
]

function Board() {
    const [cards, setCards] = useState(INITIAL_CARD)
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled ,setDisabled] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)

  const shuffleCards = () => {
      const shuffleCards = [...card_imgs, ...card_imgs]
      .sort(()=> Math.random() - 0.5)
      .map(card =>({...card, id:Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setIsGameOver(false)
      setCards(shuffleCards)
      setTurns(0)
  }
    
  const handleChoice =(card) => {
      console.log(card)
      choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  }

  useEffect(()=>{
      if (choiceOne && choiceTwo) {
          setDisabled(true)

          if (choiceOne.src === choiceTwo.src) {
              setCards(prevCards => {
                  return prevCards.map(card => {
                      if (card.src === choiceOne.src) {   
                          return {...card , matched: true}
                      } else {
                          return card
                      }
                  })
              })
              resetTurn()
          } else {
              setTimeout(() => resetTurn(), 1000)
          }
      }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns +1)
      setDisabled(false)
  }

  useEffect(() => {
      shuffleCards()
  },[])

  useEffect(() => {
      const allCardsFlipped = cards.every(c => c.matched);
      if(allCardsFlipped === true) {
        setTimeout(() => setIsGameOver(true), 1000)
      }
},[cards])

    return (
        <div>
        <h1>משחק הזיכרון המשפחתי שלי</h1>
        <div className="board">
         <button onClick={() => shuffleCards()}>התחל</button> 
      
         {!isGameOver ? <div className="card-grid">
             {cards.map(card => (
                <Card 
                    key={card.id} 
                    card= {card}
                    handleChoice= {handleChoice}
                    flipped= {card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                /> 
             ))}
         </div> : <div><h1>כל הכבוד</h1><h2>לחץ התחל למשחק חדש</h2></div>}

            <p>תור מספר: {turns}</p>
        </div>
        </div>
    )
}

export default Board
