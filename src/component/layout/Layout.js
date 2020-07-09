import React, { Component } from 'react'
import Preview from '../drag-section/Preview.js'
import Toolbox from '../drop-section/Toolbox'
import './layout.css'
import {MainContext} from '../../ContextAPI'
import { TimelineLite, CSSPlugin } from "gsap/all";



// import NewWindow from 'react-new-window'
export default class Layout extends Component {
    constructor(props) {
        super(props);
    
        console.log(this.props)
        	// logo container
		this.exportBtn = null;
		// logo tween
		this.exportBtnTween = null;
    }
    
    state={
        currentElement:'',
        newWindow:false
    }
    static contextType=MainContext;
    onDragStart = (ev, id) => {

        this.context.changeDrag();
     
      this.setState({
        currentElement:id
    })
    this.setState({
        currentElement:id
    })
    
    }

    onDragOver = (ev,id) => {
        
        ev.preventDefault();
     

    }

    onDrop = (ev,id) => {
        this.context.changeDrag();
        this.context.updatePreview(this.state.currentElement)
        this.setState({
            currentElement:''
        })
    
       
    
    }
    openWindow=()=>{
    // //   this.setState({
    // //       newWindow:!this.state.newWindow
    // //   })
    // console.log(this.props)
    localStorage.setItem("data", JSON.stringify(this.context.preview));
    window.open('/preview')

    }

    // PreviewOut=()=>{
    //     const preview= <PreviewOut/>
    //     return(
    //         <PreviewOut Preview={preview}/>
    //     )
    // }
    componentDidMount(){
		// create logo tween
		this.exportBtnTween = new TimelineLite({ paused: false }).to(this.exportBtn, 0.5, {autoAlpha:1, x: 400, delay: 0.5});
    
	}
    render() {
       
        return (
            <div>
            
           
               {/* this.context.newWindow ? 
            <NewWindow onUnload={this.context.openWindow} features={"width=420,height=230,resizable,scrollbars=yes,status=1"} title='Preview'>
           {this.PreviewOut()}
          </NewWindow>
           
           : */}
           <div  className='App'>
            
            <div className='row'>
                <div className='column'>
                <button ref={ img => this.exportBtn = img} className='black-button' onClick={()=>console.log('hi')}>
                        Export
                    </button>
                    <button className='blue-button' onClick={
                      this.openWindow
                   
                    
                    }>
                        Preview
                    </button>
                </div>
            </div>
                <div className='container'>
                    <Preview onDragOver={this.onDragOver} onDrop={this.onDrop} onDragStart={this.onDragStart} items={this.context.preview}/>
                    <Toolbox items={this.context.default_data} onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} />
                </div>
            </div>
            
            </div>
        )
    }
}
