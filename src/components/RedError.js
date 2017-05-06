import React from 'react';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const errorStyle  = {
  display: 'inline-block',
  margin: '20px auto',
  borderRadius: '4px',
  padding: '8px 15px',
  color: 'rgb(240, 45, 45)',
  fontWeight: 'bold',
  backgroundColor: 'rgba(240, 45, 45, 0.1)'
};

export default class RedError extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <div style={errorStyle}>
          {this.props.message}
        </div>
      </div>
    );
  }
}
