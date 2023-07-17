import './index.css'
import {Component} from 'react'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {list, tabsList} = this.props
    this.state = {
      imagesList: list,
      tabsList,
      isTrue: false,
      category: 'FRUIT',
      score: 0,
      time: 60,
      imgUrl: list[0].imageUrl,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.statusChange, 1000)
  }

  playAgain = () => {
    const {imagesList} = this.state
    this.setState({
      score: 0,
      imgUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
      isTrue: false,
      time: 60,
    })

    this.timerId = setInterval(this.statusChange, 1000)
  }

  imageClick = thumbnailUrl => {
    const {imagesList, imgUrl} = this.state
    console.log(imagesList)
    const imageValue = imagesList.filter(
      eachItem => eachItem.thumbnailUrl === thumbnailUrl,
    )
    const {imageUrl} = imageValue[0]
    if (imageUrl === imgUrl) {
      const newImgUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      console.log(newImgUrl)
      this.setState(prevState => ({
        score: prevState.score + 1,
        imgUrl: newImgUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }
  }

  clickTab = tabId => {
    this.setState({category: tabId})
  }

  statusChange = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }
  }

  render() {
    const {
      isTrue,
      category,
      score,
      time,
      imgUrl,
      imagesList,
      tabsList,
    } = this.state
    const thumbnailList = imagesList.filter(
      eachItem => eachItem.category === category,
    )

    return (
      <div className="main-container">
        <nav className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="logo"
            alt="website logo"
          />

          <ul className="info-container">
            <li className="score-con">
              <p>
                Score: <span className="score">{score}</span>
              </p>
            </li>
            <li className="timer-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
              <p className="time">{time} sec</p>
            </li>
          </ul>
        </nav>

        <div className="bg-container">
          {!isTrue && (
            <div className="sec-1">
              <div className="main-img-container">
                <img src={imgUrl} className="big-image" alt="match" />
              </div>
              <ul className="tab-elements">
                {tabsList.map(eachValue => (
                  <li className="tab" key={eachValue.tabId}>
                    <button
                      type="button"
                      className={`tab-button ${
                        category === eachValue.tabId ? 'highlight-text' : ''
                      }`}
                      onClick={() => this.clickTab(eachValue.tabId)}
                    >
                      {eachValue.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="thumbnail-container">
                {thumbnailList.map(eachObject => (
                  <li key={eachObject.id}>
                    <button
                      type="button"
                      className="image-button"
                      onClick={() => this.imageClick(eachObject.thumbnailUrl)}
                    >
                      <img
                        src={eachObject.thumbnailUrl}
                        className="thumbnail-image"
                        alt="thumbnail"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isTrue && (
            <div className="sec-2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                className="trophy-image"
                alt="trophy"
              />
              <p className="main-heading">YOUR SCORE </p>
              <p className="your-score">{score}</p>
              <button
                type="button"
                className="play-button"
                onClick={this.playAgain}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="restart"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
