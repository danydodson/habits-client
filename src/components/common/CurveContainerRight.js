import './CommonComponents.css'
import React from 'react'

export default function CurveContainerRight(props) {

    const classes = "curved-container-right " + props.className
    const ids = props.id
    
   return (
      <section id={ids} className={classes}>
         {props.children}
         <div className="curved corner-b-right cc-rose"></div>
         <div className="curved corner-t-right cc-rose"></div>
      </section>
   )
}