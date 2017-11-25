import React, {Component} from 'react'
import {Area, Line, LineChart, ResponsiveContainer, XAxis, CartesianGrid, ReferenceLine, YAxis} from 'recharts'

const data = [
  {name: '1', uv: 3000, pv: 3000},
  {name: '2', uv: 3000, pv: 3000},
  {name: '3', uv: 3200, pv: 3200},
  {name: '4', uv: 3250, pv: 2900},
  {name: '5', uv: 3280, pv: 2730},
  {name: '6', uv: 3300, pv: 2400},
  {name: '7', uv: 3280, pv: 2350},
  {name: '8', uv: 3450, pv: 2350},
  {name: '9', uv: 3400, pv: 2200},
  {name: '10', uv: 3600, pv: 2200},
  {name: '11', uv: 3500, pv: 2100}
];

export default class Chart extends Component {
    render () {
      return (
        <div className="pt3">
          <span className="b purple ma1">-</span><span className="f7">Aktuální období (4.5.2017 - 3.11.2018)</span>
          <ResponsiveContainer width={"100%"} height={200}>
        <LineChart data={data}>
            <Line animationEasing="ease-out" type="monotone" dataKey="uv" stroke="#b71c1c" strokeWidth={4} dot={false}/>
            <Line animationEasing="ease-out" type="monotone" dataKey="pv" stroke="green" strokeWidth={4} dot={false}/>
            <XAxis dataKey="name" />
            <YAxis hide={true} domain={[1500, 'dataMax + 500']}/>
            <CartesianGrid vertical={false}/>
            <ReferenceLine x="3" stroke="purple"/>
        </LineChart>
        </ResponsiveContainer>
        </div>
      )
    }
  }