import { useEffect, useRef, useState } from "react"
import * as d3 from 'd3'
import './graph.css'
import { useSelector } from "react-redux"


export const Graph=({score})=>{
    console.log('reason from graph',{score});
    //getting the score data from redux using useSelector hook
    const datais=useSelector((state)=>state.scores);
   
    const [data,setData]=useState(datais);
    const svgRef=useRef();
    useEffect(()=>{
     //setting up the svg
     const w=550;
     const h=300;
     const svg=d3.select(svgRef.current)
     .attr('width',w)
     .attr('height',h)
     .style('background','antiquewhite')
     .style('margin-top','50')
     .style('overflow','visible')
     //setting up the scale
     const xScale=d3.scaleLinear()
     .domain([0,data.length])
     .range([0,w])
     
     const yScale=d3.scaleLinear()
     .domain([0,40])
     .range([h,0])

     const generateScaledLine=d3.line()
     .x((d,i)=>xScale(i))
     .y(yScale)
     .curve(d3.curveCardinal)
    //setting up the axes
    const xAxis=d3.axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(i=>i)
    const yAxis=d3.axisLeft(yScale)
    .ticks(5)
    svg.append('g')
    .call(xAxis)
    .attr('transform',`translate(0,${h})`)
    svg.append('g')
    .call(yAxis)

     svg.selectAll('.line')
     .data([data])
     .join('path')
     .attr('d',d=>generateScaledLine(d))
     .attr('fill','none')
     .attr('stroke','black')
    },[data])
    return <div className="d3-main">
       <svg ref={svgRef} ></svg>
    </div>
}