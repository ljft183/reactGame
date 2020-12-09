import React from 'react';

class Rank extends React.Component {
    render() {
        return (
          <tr>
            <td>{this.props.rank}</td>
            <td>{this.props.name}</td>
            <td>{this.props.time}</td>
          </tr>
        )
    }
}

export default Rank;