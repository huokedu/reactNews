/**
 * Created by YangQianHui on 2017/4/9.
 */
import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

class PCNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ''
    }
  };

  componentDidMount() {
    let myFetchOptions = {
      method: 'GET'
    }
    console.log(this.props);
    console.log(this.props.params);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          newsItem: json
        })
        document.title = this.state.newsItem.title + "- React News | React 驱动的新闻平台";
      });
  }

  creatMarkup() {
    return {__html: this.state.newsItem.pagecontent};
  };

  render() {
    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.creatMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count="40" type="top" width="100%" cardTitle="相关新闻" imageWidth="140px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    );
  }
}
PCNewsDetails.defaultProps = {};

export default PCNewsDetails;
