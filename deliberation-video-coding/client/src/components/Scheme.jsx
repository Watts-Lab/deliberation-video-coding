import React from "react";

export function Scheme({scheme}) {
    const categories = []
    for (let i = 0; i < scheme.length; i++) {
        const elt = scheme[i];
        if (!categories.includes(elt.category)) {
            categories.push(elt.category);
        }
    }
    //<category title>, <name: description> <name: description>, <category title> <name: description>...
    const schemeElements = [] 
    console.log("categories " + categories.length)
    for (let i = 0; i < categories.length; i++) {
        
        const arr = scheme.filter((elt) => {
            return elt.category === categories[i];
        });
        console.log(arr);
        schemeElements.push(
            <h2>{categories[i]}</h2>
        )
        for (let j = 0; j < arr.length; j++) {
            schemeElements.push(
                <p>{arr[j].name}: {arr[j].description}</p>
            )
        }
    }

    return (
        <div>
            {schemeElements}
        </div>
    )
}