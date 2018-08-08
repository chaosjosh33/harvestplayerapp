import React from "react"
import { StyleSheet, css } from './aphroditeExtension'

export default class DebugPanel extends React.Component {
    render() {
    const styles = StyleSheet.create({
        debug: {
            position: "absolute",
            display: this.props.debugVisibility,
            backgroundColor: "rgba(255,255,255,.7)",
            left: 0,
            top: 0,
            padding: "16px",
            width: "auto",
            zIndex: 100,
            borderRadius: "3px",
            "&ul": {
                listStyle: "none"
            }
        },
        "&h3": {
            display: "none"
        }

    })
        return(
            <div className={css(styles.debug)}>
                <h3>Debug Stats</h3>
                <ul>
                    <li>Stream: {this.props.stream}</li>
                    <li>Dropped Frames: {this.props.droppedFrames}</li>
                    <li>Total Frames: {this.props.totalFrames}</li>
                </ul>
            </div>
        )
    }
}
