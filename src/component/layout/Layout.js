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
        this.previewBtn=null
        this.logo=null;
		// logo tween
        this.exportBtnTween = null;
        this.previewBtnTween = null;
        this.logoTween=null;
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
        this.previewBtnTween = new TimelineLite({ paused: false }).to(this.previewBtn, 0.5, {autoAlpha:1, x: -800, delay: 0.5});
        this.logoTween = new TimelineLite({ paused: false }).from(this.logo1, 0.5, {delay:1,
            y:20,
            opacity:0,});
            this.logoTween = new TimelineLite({ paused: false }).from(this.logo2, 0.5, {delay:1,
                y:20,
                opacity:0,});
    
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
            <div className='column flex'>
            <h2 ref={ logo => this.logo1 = logo}>
                        From
                    </h2>
                    <h2 >
                        -
                    </h2>
                    <h2 ref={ logo => this.logo2 = logo}>
                       Builder
                    </h2>
            </div>
                <div className='column mg-bottom-2rem mg-1rem'>
                <button ref={ btn => this.exportBtn = btn} className='button bg-black export-button' onClick={()=>console.log('hi')}>
                        Export
                    </button>
                    <button ref={ btn => this.previewBtn = btn} className='button bg-blue view-button' onClick={
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