import React from 'react';
import "./footer.css";

const Footer = () => {
    const yr = new Date().getFullYear();
  return (<div className='footer'>
    <div>Copyright &#x24B8; {yr} Vishal Kashyap</div>
    <div><a href="https://www.linkedin.com/in/vishal-kashyap-447a451ba" target='blank' className='linkedinButton'><i className="fa-brands fa-linkedin fa-2xl"></i></a><a href="https://github.com/vishalkashyap247" target='blank' className='githubButton'><i className="fa-brands fa-github fa-2xl"></i></a></div>
    
    <a href='https://github.com/vishalkashyap247'> Top projects @ GitHub</a> <span>  |  </span>
    <a href='https://github.com/vishalkashyap247/money-tracker-24/blob/main/README.md'> More about project @ Readme</a><span>  |  </span>
    <a href='https://www.linkedin.com/in/vishal-kashyap-447a451ba/'> Connect via @ LinkedIn</a>
  </div>
  )
}

export default Footer