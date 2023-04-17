import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CurveContainerRight from '../common/CurveContainerRight';

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/my-profile`;



export default function CreateProfileForm () {
    const storedToken = localStorage.getItem('authToken')
    const [user, setUser] = useState("")

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [goals, setGoals] = useState("")

    const [isCheckedMindfulness, setIsCheckedMindfulness] = useState("")
    const [isCheckedFinances, setIsCheckedFinances] = useState("")
    const [isCheckedHealth, setIsCheckedHealth] = useState("")
    const [isCheckedTech, setIsCheckedTech] = useState("")
    const [isCheckedConfidence, setIsCheckedConfidence] = useState("")


    useEffect( () => {
        const apiCall = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const userData = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${token}` }});

                setUser(userData.data)
                setUsername(userData.data.username)
                setEmail(userData.data.email)
                setGoals(userData.data.goals)

                userData.data.myPreferences.forEach(cat => {
                    if (cat === "Mindfulness") {
                        setIsCheckedMindfulness("Mindfulness")
                    }
                    if (cat === "Finances" ) {
                        setIsCheckedFinances("Finances" )
                    }
                    if (cat === "Health" ) {
                        setIsCheckedHealth("Health" )
                    }               
                    if (cat === "Tech") {
                        setIsCheckedTech("Tech")
                    }
                    if (cat === "Self Confidence") {
                        setIsCheckedConfidence("Self Confidence")
                    }
                    
                });
            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }, [])

    const onChangeUsernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onChangeGoalsHandler = (e) => {
        setGoals(e.target.value)
    }



    const onChangeMindfulnessHandler = (e) => {
        if (isCheckedMindfulness !== "") {
            setIsCheckedMindfulness("")
        } else {setIsCheckedMindfulness(e.target.value)}
    }
    const onChangeFinancesHandler = (e) => {
        if (isCheckedFinances !== "") {
            setIsCheckedFinances("")
        } else {setIsCheckedFinances(e.target.value)}
        
    }
    const onChangeHealthHandler = (e) => {
        if (isCheckedHealth !== "") {
            setIsCheckedHealth("")
        } else {setIsCheckedHealth(e.target.value)}
    }

    const onChangeTechHandler = (e) => {
        if (isCheckedTech !== "") {
        setIsCheckedTech("")
        } else {setIsCheckedTech(e.target.value)}
    }

    const onChangeConfidenceHandler = (e) => {
        if (isCheckedConfidence !== "") {
            setIsCheckedConfidence("")
            } else {setIsCheckedConfidence(e.target.value)}
    }

    const submitHandler = async (event) => {
        event.preventDefault()


        const preferencesArr = []

        if(isCheckedMindfulness){
            preferencesArr.push(isCheckedMindfulness)
        }
        if(isCheckedFinances){
            preferencesArr.push(isCheckedFinances)
        }
        if(isCheckedHealth){
            preferencesArr.push(isCheckedHealth)
        } 
        if(isCheckedTech){
            preferencesArr.push(isCheckedTech)
        }
        if(isCheckedConfidence){
            preferencesArr.push(isCheckedConfidence)
        }

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {myPreferences: preferencesArr}, {headers: {Authorization: `Bearer ${storedToken}`}})
            await axios.put(`${process.env.REACT_APP_API_URL}/api/my-profile/edit`, {username: username, email, goals}, {headers: {Authorization: `Bearer ${storedToken}`}})

            navigate("/profile")

        } catch (err) {
            console.log(err)
        }
    } 


    return (

        <form onSubmit={submitHandler}>
        {user !== null && <section className="textinput-container form">
                <div className="form-row">
                  <label>Username</label>
                  <input type="text" name="username" value={username} onChange={onChangeUsernameHandler} />
               </div>
               <div className="form-row">
                  <label>Email</label>
                  <input type="email" name="email" value={email} onChange={onChangeEmailHandler} />
               </div>
               <div className="form-row">
                  <label>My Goals</label>
                  <textarea name="goals" value={goals} onChange={onChangeGoalsHandler}></textarea>
               </div>
            </section>}
            
            <CurveContainerRight className="category-checkbox-container">
                <h3>Interests</h3>
                <section className="category-flex-container">
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="mindfulness" 
                                value="Mindfulness"
                                checked={isCheckedMindfulness}
                                onChange={onChangeMindfulnessHandler}
                            /> 
                            <span>Mindfulness</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="finances" 
                                value="Finances" 
                                checked={isCheckedFinances}
                                onChange={onChangeFinancesHandler}
                            /> 
                            <span>Finances</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                            type="checkbox" 
                            name="health" 
                            value="Health" 
                            checked={isCheckedHealth}
                            onChange={onChangeHealthHandler}
                            /> 
                            <span>Health</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="tech" 
                                value="Tech" 
                                checked={isCheckedTech}
                                onChange={onChangeTechHandler}
                            /> 
                            <span>Tech</span>
                        </label>
                    </div>
                    <div className="category-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="confidence" 
                                value="Self Confidence" 
                                checked={isCheckedConfidence}
                                onChange={onChangeConfidenceHandler}
                            /> 
                            <span>Self Confidence</span>
                        </label>
                    </div>
                </section>

                <button className="button-blue-lg"type="submit">UPDATE</button>
            </CurveContainerRight>
        </form>

    )
}