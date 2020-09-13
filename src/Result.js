import React from 'react';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Container } from 'react-bootstrap';

const Result = (props) => {
    const { results, onSearchAgain, sortBy, handleShowDetails, showDetails, wantMoreDetails } =  props
    console.log(results)

    const resultList = results.map((item, index) => {
        
        if (item.show.image) {
           return (
            <div key={index}>
                <div>
                    {item.show.name}
                </div>
                <div>
                    <img alt={item.show.name} src={item.show.image.medium} id={item.show.id} onClick={(e)=> handleShowDetails(e)} />
                </div>
                <div>
                    Rating: {item.show.rating.average}
                </div>
                <div>
                    Runtime: {item.show.runtime} min
                </div>

            </div>
           )
        } else {
            return (
                <div key={index}>
                    <div>
                        {item.show.name}
                    </div>
                    <div>
                        No image found
                    </div>                   
                </div>
            )

        }
    

    })

    return (
        <div>
              <button onClick={(e)=> onSearchAgain(e)}>Search again</button>

              {wantMoreDetails ? <div className="summary">{showDetails.summary.replace(/(<([^>]+)>)/gi, "")}</div> : <div><select onChange={(e)=>sortBy(e)}>
                  <option defaultValue="" disabled>Sort by...</option>
                  <option value="ratings">Ratings</option>
                  <option value="duration">Duration</option>
              </select>
              <div className ="result-list">
              {resultList}
              </div></div> }
          
        </div>
      
    )
}

export default Result