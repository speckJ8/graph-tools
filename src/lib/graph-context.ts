import React from "react"
import { Graph } from "./graph"

let Context = React.createContext<Graph>({ vertices: [], edges: [] })
export default Context
