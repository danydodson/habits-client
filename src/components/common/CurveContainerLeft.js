import './CommonComponents.css'
import React from 'react'

export default function CurveContainerLeft(props) {

    const classes = "curved-container-left " + props.className
    const ids = props.id

   return (
      <section id={ids} className={classes}>
       {props.children}
      </section>
   )
}