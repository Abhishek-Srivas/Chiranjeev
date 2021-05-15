import React from "react";
import "./Buttons.css"

export const ButtonSolid = (props) => {
    return(
        <button type={props.type} onClick={props.onClick} className="button-solid" style={{width: props.width}} >{props.children}</button>
    )
} 

export const ButtonOutline = (props) => {
    return(
        <button type={props.type} className="button-outline" >{props.children}</button>
    )
} 

export const ButtonFill = (props) => {
    return(
        <button type={props.type} className="button-fill" >{props.children}</button>
    )
} 