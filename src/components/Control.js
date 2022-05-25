import React from "react";
import {Button, Slider} from 'antd';
import 'antd/dist/antd.css';
import {CaretRightOutlined, PauseOutlined, PoweroffOutlined} from '@ant-design/icons';

const DEFAULT_CONTROL = {
    current: 43200,
    begin: 0,
    end: 86400,
    enableExampleHeatLayer: false,
    enableCabTripLayer: false,
    enableVehicleTravelLayer: false,
    enablePlaying: false,
    threeValues: [0, 43200, 86400],
}


class Control extends React.Component {

    constructor(props) {
        super(props);
        this.state = DEFAULT_CONTROL;
        setInterval(this.fetchThreeValue, 100);
    }

    fetchThreeValue = () => {
        if (this.state['enablePlaying'] && this.state['threeValues'][1] < this.state['threeValues'][2]) {
            let tmp = [this.state['threeValues'][0], Math.min(1000 + this.state['threeValues'][1], this.state['threeValues'][2]) , this.state['threeValues'][2]];
            this.setState({'threeValues': tmp}, this.onChange);
        }

    }

    onChange = () => {
        this.setState({'begin': this.state.threeValues[0]}, () => {
            this.setState({'current': this.state.threeValues[1]}, () => {
                this.setState({'end': this.state.threeValues[2]}, () => {
                    this.props.onChange(this.state);
                });
            });
        });
        

    }

    sliderChanged = (value) => {
        this.setState({'threeValues': value}, this.onChange);
    }

    changeLayer = (layerName) => {
        this.state[layerName] = !this.state[layerName];
        this.onChange();
    }

    changePlayingState = (val) => {
        this.setState({'enablePlaying': val}, this.onChange);
    }

    resetMediumValue = () => {
        let val = [this.state['threeValues'][0], this.state['threeValues'][1], this.state['threeValues'][2]];
        val[1] = this.state['threeValues'][0];
        this.setState({'threeValues': val, 'current': val[1]}, this.onChange);
    }


    render() {
        return (
            <div className=" absolute p-6 pt-3 bg-gray-100 rounded-md shadow-md left-6 top-6">    
                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md text-black "}
                    onClick={() => {

                    }}
                >上车地点
                </button>
                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md text-black "}
                    onClick={() => {

                    }}
                >上车地点聚类
                </button>
                <br/>
                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md text-black "}
                    onClick={() => {

                    }}
                >下车地点
                </button>
                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md text-black "}
                    onClick={() => {

                    }}
                >下车地点聚类
                </button>
                <br/>

                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md"
                    + (this.state.enableVehicleTravelLayer ? " text-white bg-blue-500 hover:bg-blue-400" : " bg-white hover:bg-gray-200")}
                    onClick={() => {
                        this.changeLayer('enableVehicleTravelLayer')
                    }}
                >车辆行程
                </button>
                <button
                    className={" p-2 transition w-28 m-2 rounded-md shadow-md text-black "}
                    onClick={() => {

                    }}
                >高峰路段
                </button>

                <hr className=" my-4"/>


                <Slider range min={0} max={86400} value={this.state['threeValues']} disabled={false} onChange={
                    this.sliderChanged
                }/>
                <div className=" flex justify-between text-gray-500">
                    <div>begin</div>
                    <div className=" flex justify-center space-x-2">
                        <Button type="primary" shape="circle" icon={this.state['enablePlaying'] ? <PauseOutlined/> : <CaretRightOutlined/>} onClick={() => {
                            this.changePlayingState(!this.state['enablePlaying']);
                        }}/>
                        <Button type="primary" shape="circle" icon={<PoweroffOutlined/>} onClick={()=>{
                            this.resetMediumValue();
                            this.changePlayingState(false);
                        }}/>
                    </div>
                    <div>end</div>
                </div>

            </div>
        )
    }

}

export {Control, DEFAULT_CONTROL};