"use strict"
import React from 'react'
import { Link } from "react-router"
import Transmit from 'react-transmit'
import './ProposalList.css'
import {img, figure} from 'react'

import proposalData from '../Proposal/data/Proposals.json'

const stageIntro = {
    "collect": [
        "ProposalList.jsx - collect",
    ],
    "init": [
        "ProposalList.jsx - init"
    ],
    "spec": [
        "ProposalList.jsx - spec"
    ],
    "ref": [
        "ProposalList.jsx - ref"
    ],
    "act": [
        "ProposalList.jsx - act"
    ]
}

class ProposalList extends React.Component {
    render() {
        let proposalList = Object.keys(proposalData).map((k) => proposalData[k])
        
        if (this.props.stage) {
            proposalList = proposalList.filter((item, key) =>
              new RegExp("^" + this.props.stage).test(item.stages[0].category))
        }
        if (!proposalList.length) { return <section className="ProposalList" /> }
        

       
        proposalList = proposalList.map((item, key)=>
            <Link to="proposal" key={key}
                params={{proposalName: item.title_eng}}
                className={
                    (/securitization|social-enterprise|directors-election/.exec(item.title_eng)) // TODO: check date
                        ? "ProposalList-item active"
                        : "ProposalList-item inactive"
                }
                onClick={(e) => {
                // TODO: Stage 0, during the survey period, e.g.:
                if (item.title_eng === 'sandbox') {
                    e.stopPropagation();
                    location.href = '/sandbox/';
                }
                }}>
                <div className="ProposalList-item-outer">
                <div className="ProposalList-item-inner">
                <div className="ProposalList-item-innermost">
                <img className="ProposalList-item-image"
                    src={item.slides_image} /></div></div></div>
                <div className="ProposalList-item-info">
                    <span className="ProposalList-item-title">
                        {item.title_cht}
                    </span>
                    <span className="ProposalList-item-proposer">
                        @{item.proposer_abbr_cht}
                    </span>
                </div>
            </Link>
        )
       
        return <section className="ProposalList">
            <h2 className="ProposalList-title">
                <img className="ProposalList-stage-image"
                    src={require(`./images/${this.props.stage}.png`)} />
                {this.props.title || ''}
            </h2>
            <div className="ProposalList-sectionIntro">
                <ul>{stageIntro[this.props.stage].map((value, k)=>
                    <li key={k}>{value}</li>
                )}</ul>
            </div>
            {proposalList}
        </section>
    }
}
export default Transmit.createContainer(ProposalList, {})
