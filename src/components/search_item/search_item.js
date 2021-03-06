import React, { Component } from 'react';
import { Rate, Icon } from 'antd';
import './search_item.css';
import { connect } from 'react-redux';
import { Button, Radio, Popover } from 'antd';
import { Link } from 'react-router-dom'
import {
    addShopCart,
    addWishList,
    getCourseRounds,
    removeWishlist
} from '../../actions'
import { withRouter } from "react-router-dom";

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
class Search_item extends Component {
    constructor(props) {
        super(props);
        this.state = { rating: 3.3, liked: false, wish_id: '' }
    }

    componentDidMount() {
    }

    onChange = (e) => {
        if (!this.props.auth.status) { this.props.history.push({ pathname: '/login_signup', state: { modal: true } }) } else {
            this.setState({
                value: e.target.value,
            });
            this.hide()
            this.props.addShopCart(e.target.value.price, this.props.id, e.target.value.id)
        }
    }
    checkLike() {
        let items = this.props.wishlist.filter(e => e.course === this.props.id);
        if (items.length > 0) {
            this.setState({ liked: true, wish_id: items[0].id })
        } else {
            this.setState({ liked: false })
        }
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
        if (visible) {
            if (this.props.rounds.filter(e => e.course === this.props.id).length === 0)
                this.props.getCourseRounds(this.props.id)
        }
    }

    componentWillReceiveProps(e) {
        this.checkLike()
    }

    render() {
        const rounds = this.props.rounds.filter(e => e.course === this.props.id)
        const category = this.props.categories.filter(e => e.id === this.props.category.category)
        const category_name = category.length > 0 ? category[0] : {}
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const content = (
            <div>
                {/* onClick={(e) => { this.addShopCart(e) }} */}
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    {rounds.map(e => {
                        return <div style={{ padding: '6px' }} ><Radio className="animated fadeIn" style={radioStyle} value={e}> <span style={{ whiteSpace: 'nowrap', width: '120px', overflow: 'hidden', float: 'right' }} > {e.name_e} </span></Radio>
                            {e.start_date} - {e.end_date} <br />
                            {e.price} $
                        </div>
                    })}
                </RadioGroup>
                {this.props.loading.getCourseRounds === 1 && rounds.length === 0 ? <div style={{ textAlign: 'center', padding: '20px' }} > <Icon type="loading" style={{ color: '#04bafe', textAlign: 'center', fontSize: '20px' }} spin /> </div> : rounds.length === 0 ? <div style={{ textAlign: 'center', padding: '20px' }} >No rounds found</div> : ''}
            </div>
        );
        return (
            <li className="list-group-item animated fadeIn" style={{borderRight:this.props.lang==='ar'?'6px solid black':'', borderLeft: this.props.lang === 'ar'?'':'6px solid black', width: '95%', margin: 'auto', marginBottom: '20px' }}  >

                <div className="row media" style={{padding:10}} >
                    <div className="col media-left">
                        <Link to={{ pathname: `/courses/${this.props.id}` }} >
                            <img className="media-object img-rounded" src={this.props.image ?  this.props.image : '/images/error.jpg'} onError={(e) => { e.target.src = '/images/error.jpg' }} alt={this.props.name_e} />
                        </Link>
                    </div>
                    <div className="col media-body" style={{paddingLeft:20,paddingRight:20 }}>
                        {/* <div className="row" > */}
                        <Link to={{ pathname: `/courses/${this.props.id}` }} >

                            <div className="col" >
                                <h4 className="media-heading lead" > {this.props.lang === 'ar' ? this.props.name_a : this.props.name_e}  </h4>
                            </div>
                        </Link>

                        {/* </div> */}
                        <div className="col" >

                            <p> {this.props.lang === 'ar' ? this.props.short_desc_a : this.props.short_desc_e} </p>
                        </div>
                        <div className="col" >
                            <Link to={{ pathname: `/courses/category/${category_name.id}` }} >
                                {this.props.lang==='ar'?category_name.attr2:category_name.attr1}
                            </Link>
                        </div>
                        <div className="col" >

                            <Rate allowHalf style={{ fontSize: 'large' }} disabled value={this.props.rate} />

                            <span>
                                <span style={{marginRight:8}} className="ant-rate-text">{this.props.raters} <Icon type="user" /></span>
                            </span>
                        </div>
                        <div className="col" >
                            $ {this.props.price}
                        </div>
                        <div className="col" style={{ float: this.props.lang === 'ar' ? 'left' : 'right' }} >
                            {this.state.liked ?
                                <button className="btn btn-light" style={{ fontSize: '11px' }} onClick={() => { this.setState({ liked: false }); this.props.removeWishlist(this.state.wish_id) }} >
                                    <i className={"fa fa-heart fa-2x fa-red"} ></i>
                                </button>
                                :
                                <button className="btn btn-light" style={{ fontSize: '11px' }} onClick={() => { if (!this.props.auth.status) { this.props.history.push({ pathname: '/login_signup', state: { modal: true } }) } else { this.props.addWishList(this.props.id); this.setState({ liked: true }) } }} >
                                    <i className={"fa fa-heart-o fa-2x fa-red"} ></i>
                                </button>
                            }
                            <Popover
                                trigger="click"
                                onVisibleChange={this.handleVisibleChange}
                                content={content} visible={this.state.visible} title="Choose course round">
                                <button className="btn btn-light" style={{ fontSize: '11px' }} >
                                    <i className={"fa fa-shopping-cart fa-2x fa-red"} ></i>
                                </button>
                            </Popover>
                        </div>
                    </div>
                    <div className="col" style={{float:this.props.lang==='ar'?'left':'right'}}  >  <cite title="Source Title "> {this.props.creation_date}</cite></div>

                </div>
            </li>
            // <div className="animated fadeIn" >

            //     <li className="list-group-item" style={{ borderLeft: '6px solid black', marginBottom: '20px' }} >
            //         <div className="media">
            //             <div className="media-left">
            //               <Link to={{pathname:`/courses/${this.props.id}`}} >
            //                     <img className="media-object img-rounded" height="140px" width="140px" src={this.props.image?this.props.image:'./images/error.jpg'} onError={(e) => { e.target.src = './images/error.jpg' }} alt={this.props.name} />
            //                </Link>
            //             </div>
            //             <div className="media-body">
            //             <Link to={{pathname:`/courses/${this.props.id}`}} >

            //                 <h4 className="media-heading lead">{this.props.name}</h4>
            //                 </Link>
            //                 <div className="row" >
            //                     <div className="col-md-8">
            //                         <p style={{marginBottom:'5px'}} >{this.props.desc}</p>
            //               <Link to={{pathname:`/courses/category/${category_name.id}`}} >
            //                         <span > {category_name.attr1} </span> <br/>
            //                     </Link>

            //                         <Rate  allowHalf style={{ fontSize: 'large' }} disabled value={this.props.rate} />

            //                             <span style={{marginBottom:'5px'}} className="ant-rate-text">{this.props.raters} <Icon type="user" /></span>
            //                          <br/> 

            //                         <span  >
            //                             <span >$ {this.props.price} </span>
            //                         </span>

            //                     </div>

            //                     <div className="col-md-4 text-right" >
            //                     {this.state.liked?
            //                         <button className="btn btn-light" style={{ fontSize: '11px' }} onClick={() => {this.setState({liked:false});this.props.removeWishlist(this.state.wish_id)}} >
            //                             <i className={"fa fa-heart fa-2x fa-red"} ></i>
            //                         </button>
            //                         :
            //                         <button className="btn btn-light" style={{ fontSize: '11px' }} onClick={() => {if(!this.props.auth.status){ this.props.history.push({pathname:'/login_signup',state:{modal:true}}) } else{this.props.addWishList(this.props.id);this.setState({liked:true}) }}} >
            //                             <i className={"fa fa-heart-o fa-2x fa-red"} ></i>
            //                         </button>
            //                     }
            //                         <Popover
            //                         trigger="click"
            //                         onVisibleChange={this.handleVisibleChange}
            //                         content={content} visible={this.state.visible} title="Choose course round">
            //                         <button className="btn btn-light" style={{ fontSize: '11px' }} >
            //                             <i className={ "fa fa-shopping-cart fa-2x fa-red" } ></i>
            //                         </button>
            //                     </Popover>

            //                     </div>
            //                 </div>


            //             </div>
            //             <footer className="text-right" >- <cite title="Source Title">{this.props.creation_date}</cite></footer>

            //         </div>
            //     </li>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    return { rounds: state.shop_cart.rounds, loading: state.loadingBar, categories: state.header.categories, wishlist: state.wishlist.mini, auth: state.Authentication }
}

export default connect(mapStateToProps, {
    removeWishlist, addShopCart,
    addWishList,
    getCourseRounds
})(withRouter(Search_item));