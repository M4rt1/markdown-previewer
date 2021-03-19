import React from 'react';
import './styles/App.css';
import Badge from 'react-bootstrap/Badge';
import { saveAs } from '@progress/kendo-file-saver';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      markdown:`Example of <h1>H1</h1><br/><h2>H2</h2><br/><a href="#">Blank link</a><br/><script>console.log("You can use scripts");</script></br><div>Some text in div</div><script>if(true){let x=2; let y=2;}</script></br><ul><li>List</li><li>of</li><li>elements</li></ul></br><blockquote cite="https://www.theatlantic.com/magazine/archive/2015/11/we-need-an-energy-miracle/407881/"><p>Every single year we’ll be emitting more greenhouse gases than the previous year. - Bill Gates</p></blockquote></br><img src="#" alt="Here should be image"/></br><b>Bold text</b>`,
    };
    this.updateMarkdown=this.updateMarkdown.bind(this);
    this.handleChangeMarkdown=this.handleChangeMarkdown.bind(this);
    this.resetMarkdown=this.resetMarkdown.bind(this);
    this.saveMarkdown=this.saveMarkdown.bind(this);
  }

  //set textarea to state
  updateMarkdown(markdown){
    this.setState({markdown});
  }

  // reset markdown
  resetMarkdown(){
    this.setState({
      markdown:''
    })
  }

  // save markdown as html file
  saveMarkdown(){
    let data = this.state.markdown;
    let buff = new Buffer(data);
    let stringToBase64 = buff.toString('base64');
    const dataURI = "data:text/plain;base64," + stringToBase64;
    saveAs(dataURI, "index.html");
  }

  // handle change in textarea and set it to state
  handleChangeMarkdown(e){
    this.updateMarkdown(e.target.value);
  }

  render(){
    let marked=require('marked');

    let inputStyle = {
      width:'400px',
      height:'50vh',
      marginLeft: 'auto',
      marginRight:'auto',
      marginBottom:'15px',
      padding:'10px'
    };

    let outputStyle = {
      width:'400px',
      minHeight:'50vh',
      backgroundColor:'#DCDCDC',
      marginLeft:'auto',
      marginRight:'auto',
      marginBottom:'15px',
      padding:'10px'
    };

    return(
      <div className="App">
        <div className='row mt-4'
        style={{
          marginLeft:'0px',
          marginRight:'0px',
        }}>
          <div className='col text-center'>
            <div className='container'>

              {/** title header */}
              <h1>
                <Badge className='text-align-center' variant='light'>
                  Markdown Previewer
                </Badge>
              </h1>

              <div className='row mt-4'>
                <div className='col-md-6'>

                  {/** header div */}
                  <div className='col text-center'>
                    <h2>
                      <Badge className='text-align-center' variant='light'>
                        Markdown Input
                      </Badge>
                    </h2>
                  </div>

                  {/** input div */}
                  <div 
                  className='mark-input' 
                  style={inputStyle}>
                    <textarea id='editor' style={inputStyle} value={this.state.markdown} onChange={this.handleChangeMarkdown}>
                      {console.log(this.state.markdown)}
                    </textarea>
                  </div>

                </div>

                <div className='col-md-6'>

                  {/** preview div */}
                  <div className='col text-center'>
                    <h2>
                      <Badge className='text-align-center' variant='light'>
                        Preview
                      </Badge>
                    </h2>
                  </div>

                  {/** output div */}
                  <div
                  id='preview'
                  style={outputStyle}
                  dangerouslySetInnerHTML={{__html:marked(this.state.markdown)}}
                  ></div>
                </div>
              </div>

              {/** markdown reset button */}
              <button className='reset-style' onClick={this.resetMarkdown}>
                RESET
              </button>
              <br/>
              {/** save as html file button */}
              <button className='save-style' onClick={this.saveMarkdown}>
                SAVE AS HTML FILE
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}