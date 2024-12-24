import React from "react";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis} from "recharts";

const BarChartComponent = ({data}) => {
    return <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 50,
            left: 50,
            bottom: 5,
        }}
        barSize={20}
    >
        <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
        <Tooltip/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Bar dataKey="pv" fill="#8884d8" background={{fill: "#eee"}}/>
    </BarChart>;
};

export default BarChartComponent;
