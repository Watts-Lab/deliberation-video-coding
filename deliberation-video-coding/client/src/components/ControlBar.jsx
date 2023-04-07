import { Button } from "./Button"
import {Play, Pause, ClockClockwise, ClockCounterClockwise} from "@phosphor-icons/react"
import React from "react";

export function ControlBar({play, pause, back, forward}) {
    return(
        <div>
            <Button handleClick={play} children={<Play/>}/>
            <Button handleClick={pause} children={<Pause/>}/>
            <Button handleClick={back} children={<ClockClockwise/>}/>
            <Button handleClick={forward} children={<ClockCounterClockwise/>}/>
        </div>
    )
}