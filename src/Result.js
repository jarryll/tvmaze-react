import React from 'react';

const Result = (props) => {
    const { results, onSearchAgain } =  props
    console.log(results)
    const resultList = results.map((item, index) => {
        
        if (item.show.image) {
           return (
            <div key={index}>
                {item.show.name}
                <img src={item.show.image.medium} />
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
              <div className ="result-list">
              {resultList}
              </div>             
        </div>
      
    )
}

export default Result