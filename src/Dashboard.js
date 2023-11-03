import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import { Card } from './card/card';
import { List } from './List/list';
import backlog from './images/backlog.png'
import canceled from './images/canceled.png';
import done from './images/done.png';
import high from './images/high.png';
import inprogress from './images/inprogress.png';
import low from './images/low.png';
import medium from './images/medium.png';
import nopriority from './images/nopriority.png';
import profile from './images/profile.png';
import todo from './images/todo.png';
import urgent from './images/urgent.png';
import drop from './images/drop.png'

function App() {

  //------heading for the five columnns------------
  const [heading1, setheading1] = useState(null);
  const [heading2, setheading2] = useState(null);
  const [heading3, setheading3] = useState(null);
  const [heading4, setheading4] = useState(null);
  const [heading5, setheading5] = useState(null);

  const [icon1, seticon1] = useState(null);
  const [icon2, seticon2] = useState(null);
  const [icon3, seticon3] = useState(null);
  const [icon4, seticon4] = useState(null);
  const [icon5, seticon5] = useState(null);

   //-----array that will contain all the data to be displayed -----------------------
  const [data1,setdata1] = useState([]);
  const [data2,setdata2] = useState([]);
  const [data3,setdata3] = useState([]);
  const [data4,setdata4] = useState([]);
  const [data5,setdata5] = useState([]);

  //---two main arrays after we fetch the api
  const [tickets, settickets] = useState([]);
  const [users, setusers] = useState([]);

  // ------ header button and choose options-------------------------------------------
  const [showdisable, setshowdisable] = useState(true);
  const [sorted, setsorted] = useState(false);
  const [group, setSelectedGroup] = useState(null);
  const [prevgroup, setprevgroup] = useState(null);
  const [order, setSelectedOrder] = useState(null);
//----------------------------------------------------------------------------------------
  const [showDisplayDropdown, setShowDisplayDropdown] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state



  const toggleDisplayDropdown = () => {
    setShowDisplayDropdown(!showDisplayDropdown);
  };

  const toggleGroupDropdown = () => {
    setShowGroupDropdown(!showGroupDropdown);
    // Hide the Order dropdown when opening the Group dropdown
    setShowOrderDropdown(false);
  };

  const toggleOrderDropdown = () => {
    setShowOrderDropdown(!showOrderDropdown);
    // Hide the Group dropdown when opening the Order dropdown
    setShowGroupDropdown(false);
  };
//-------------------------------------------------------------------------------------------
 
  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };
  const handleOrderChange = (event) => {
    // setshowdisable(false);
    setSelectedOrder(event.target.value);
  };
  const handlegroup = () => {

    if(prevgroup != null && prevgroup == group) return;
    
    setprevgroup(group);

      // setshowdisable(()=>{
      //   if(!showdisable) return true;
      // });
    // if(tickets.length!=0 && users.length!=0) return;
    if (group) 
    {
      setLoading(true);
      call(group);
      
    } 
    else alert('Please make valid selections');
    
    localStorage.setItem('selectedGroup', group);
    
  };

  const call = (group) => {
    if(group)
    {
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        settickets(data.tickets);
        setusers(data.users);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading state is set to false in case of an error
      });
    }

  }



  const handleorder = () => {
    if (order && group) {
      setLoading(true);
      
    //-------second we will work on order by--------------
    if(order == "priority")
    {
      data1.sort((a, b) => b.priority - a.priority);
      data2.sort((a, b) => b.priority - a.priority);
      data3.sort((a, b) => b.priority - a.priority);
      data4.sort((a, b) => b.priority - a.priority);
      data5.sort((a, b) => b.priority - a.priority);
    }
    else if(order == "sort")
    {
      data1.sort((a, b) => a.title.localeCompare(b.title));
      data2.sort((a, b) => a.title.localeCompare(b.title));
      data3.sort((a, b) => a.title.localeCompare(b.title));
      data4.sort((a, b) => a.title.localeCompare(b.title));
      data5.sort((a, b) => a.title.localeCompare(b.title));
    }
    setsorted(!sorted);

    } else {
      alert('Please select Groups By option first');
    }
    setLoading(false);
    localStorage.setItem('selectedOrder', order);

  };
  const finalchanges = () => {


    //-----set headings of five columns------
    if(group == "priority")
    {
      setheading1("Urgent");
      setheading2("High");
      setheading3("Medium");
      setheading4("Low");
      setheading5("No priority");
      seticon1(urgent);
      seticon2(high);
      seticon3(medium);
      seticon4(low);
      seticon5(nopriority);
    }
    else if(group == "status")
    {
      setheading1("Todo");
      setheading2("In Progress");
      setheading3("Backlog");
      setheading4("Done");
      setheading5("Canceled");
      seticon1(todo);
      seticon2(inprogress);
      seticon3(backlog);
      seticon4(done);
      seticon5(canceled);
    }
    else if(group == "user")
    {
      users.forEach(user => {
        if(user.id == "usr-1") setheading1(user.name);
        seticon1(profile);
        if(user.id == "usr-2") setheading2(user.name);
        seticon2(profile);
        if(user.id == "usr-3") setheading3(user.name);
        seticon3(profile);
        if(user.id == "usr-4") setheading4(user.name);
        seticon4(profile);
        if(user.id == "usr-5") setheading5(user.name);
        seticon5(profile);
      })
    }

    //now when heading are also set i will enable the container to set true that shows
    //all the tickets using useeffect for all headings
  };

  useEffect(() => {
    // Check if there are saved options in localStorage and use them to initialize state
    const savedGroup = localStorage.getItem('selectedGroup');
    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }
    const savedOrder = localStorage.getItem('selectedOrder');
    if (savedOrder) {
      setSelectedOrder(savedOrder);
    }

    // Fetch data based on saved options
    if (savedGroup) {
      setLoading(true); // Set loading state when fetching data

      // Call your API with savedGroup and savedOrder
     call(savedGroup);
    
    }
  }, []); // Empty dependency array to run this effect only once on component mount



  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown-button')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);
    
    
  useEffect(()=>{
    //to rerender the component after sorting the arrays
  }, sorted)

  useEffect(()=>{
    setdata1([]);
    setdata2([]);
    setdata3([]);
    setdata4([]);
    setdata5([]);
    console.log("khali krne wlaa");
  }, [tickets, users])

  useEffect(()=> {
    console.log(tickets); 
    console.log(users); 
    //now my work is to set all the five columns using heading and data cards in them

    //----first we will work on group by--------------
    if(group == "priority")
    {
      tickets.forEach(ticket => {        
        if(ticket.priority == "4") data1.push(ticket);
        if(ticket.priority == "3") data2.push(ticket);
        if(ticket.priority == "2") data3.push(ticket);
        if(ticket.priority == "1") data4.push(ticket);
        if(ticket.priority == "0") data5.push(ticket);        
      });

      // console.log(data1);
    }
    else if(group == "status")
    {
      tickets.forEach(ticket => {
        if(ticket.status == "Todo") data1.push(ticket);
        if(ticket.status == "In progress") data2.push(ticket);
        if(ticket.status == "Backlog") data3.push(ticket);
        if(ticket.status == "Done") data4.push(ticket);
        if(ticket.status == "Canceled") data5.push(ticket);
      });
      
    }
    else if(group == "user")
    {
      tickets.forEach(ticket => {
        if(ticket.userId == "usr-1") data1.push(ticket);
        if(ticket.userId == "usr-2") data2.push(ticket);
        if(ticket.userId == "usr-3") data3.push(ticket);
        if(ticket.userId == "usr-4") data4.push(ticket);
        if(ticket.userId == "usr-5") data5.push(ticket);
      });

    }
    console.log("har data me set krne wala");
    //----------i am calling a function to set the headings and then i will enable the container
    //that is going to show the data
    finalchanges();
  }, [data1, data2, data3, data4, data5]);


    

  return (
    <>
    {/* Header----------------------------- */}
    
      <div className="header">
      <div  className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`}>
      <div className="button-container">
  <button className='button-13' onClick={() => setDropdownOpen(!isDropdownOpen)}>
    <span>Display</span>
    <img src={drop} alt="Icon" className="icon" />
  </button>
  <p className='displaytext'>(Click on Display button to view previous left state)</p>
</div>


      {isDropdownOpen && (
        <div className='dropdowncontainer'>
        <div className='groupset'>
      <select value={group} className='group sel' onChange={handleGroupChange}>
          <option value="grouping" disabled selected>Group By</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="user">User</option>
        </select>
        <button className="buttons" onClick = {handlegroup}>Group</button>
        </div>
        <div className='orderset'>
        <select value={order} className='order sel' onChange={handleOrderChange}>
          <option value="ordering" disabled selected>Order By</option>
          <option value="priority">Priority</option>
          <option value="sort">Sort by title</option>
        </select>
        <button className="buttons" onClick = {handleorder}>Order</button>
        </div>
        </div>
        )}
      </div>
      </div>
      
      

    {/* main container----------------------------------- */}

    <div className="main">
      <div className="col col1">
        <List icon = {icon1} heading = {heading1}  tickets = {data1}/>
      </div>
      <div className="col col2">
        <List icon = {icon2} heading = {heading2}  tickets = {data2}/>
      </div>
      <div className="col col3">
        <List icon = {icon3} heading = {heading3}  tickets = {data3}/>
      </div>
      <div className="col col4">
        <List icon = {icon4} heading = {heading4}  tickets = {data4}/>
      </div>
      <div className="col col5">
        <List icon = {icon5} heading = {heading5}  tickets = {data5}/>
      </div>
    </div>





          
          
    </>   
  );
}

export default App;

