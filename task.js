
const commands=["help","ls","add","del","done","report"];   //as mentioned in Readme.md file
const fs=require('fs'); 
const argss=process.argv; //used to get the arguments from command line.

// 2. List all pending items
const ls=()=>{
	if(fs.existsSync("task.txt")){      //if file exist
	var read=fs.readFileSync("task.txt","utf-8");   //read
	read=read.split("\n");
     
	read=read.filter(function(e){return e;});
 
    console.log("StringContaining ");
	for(i=0;i<read.length;i++){     //showing priority in ascending order 
	console.log(read[i]);
	}
	}
	else{console.log("StringContaining There are no pending tasks!");}
}


// 3. Add a new item
const add=()=>
{
	if(argss[3])
	{
        // slice returns selected elements in an array
		var data=argss.slice(3,4);  //data - priority
        var data1=argss.slice(4);   //data1 -string
		data=(data.join(" "));
        data1=(data1.join(" "));
        let count =0;
        if(!data.length) {  //if string not found from command line
            console.log("Error: Missing todo string. Nothing added!");
        }
		if(fs.existsSync("task.txt"))
			{   
                //code for finding next index where we can append our new content
                var read=fs.readFileSync("task.txt","utf-8");
                read=read.split("\n");
                read=read.filter(function(e){return e;});
                count+=read.length+1;   //count is the index where new items will get appended
				fs.appendFile("task.txt",(count+"."+" " + data1 +" "+ "["+data+"]" +"\n"),(err)=>{if (err) throw (err);});

		 
			}
		else
		    {
                //if file doesnt exist insering it from begining
                count++;
			fs.writeFile("task.txt",(count+"."+" " + data1 +" "+ "["+data+"]" +"\n"),(err)=>{if (err) throw (err);});
	            }
		console.log("StringContaining " + "Added task: "+"\""+data1+"\"" +" with priority "+data);
	}
	else
	{
		console.log(`StringContaining "Error: Missing tasks string. Nothing added!"`);
	}
}

// 4. Delete an item
const del=()=>
{
	if(argss[3])
	{
		var read=fs.readFileSync("task.txt","utf-8");
		if(argss[3]!=0 && argss[3]<=((read.split("\n")).length)-1)
		{
		//read.split('\n') used To convert the string to an array with the newline character as seperator
		//an it is greater than 2 because an empty list will still add a white space and a new line character
		if(read.split("\n").length>2)
		{
		     
            read=read.replace((read.split("\n"))[argss[3]-1],'');
		    read=read.split("\n");
		    read=read.filter(function(e){return e;});
		    read=read.toString();
		    var myRegEx=/\,/g;
		    read=read.replace(myRegEx,"\n")+"\n";
		    console.log("StringContaining Deleted task \#"+argss[3]);
		    fs.writeFile("task.txt",read,(err)=>{
                if (err) throw (err);
            });
		}
		    //if the list is empty
            else
            {
		          read='';
		          fs.writeFile("task.txt",read,(err)=>{if(err) throw(err);});
			  console.log("StringContaining Deleted task \#"+argss[3]);
			}
		}
		else    //if index dost not exist
		{ 
		    console.log("StringContaining Error: task with index" + " #"+argss[3]+" does not exist. Nothing deleted.");

		}
	}
        else    //if no missing from command line
	{
	        console.log("StringContaining Error: Missing NUMBER for deleting tasks.");
        }
 }

 // 5 . Mark a task as completed
const completed=()=>
{
	if(argss[3])
	{
	var read=fs.readFileSync("task.txt","utf-8");
	var myregex=/\,/g;
	//data here is converted to an array from string and is basically the array element of the specified number
	var data=(read.split("\n"))[argss[3]-1];
	 
	//Here the second condition checks the length of the  file data in array form(-1 to eliminate trailing '\n')
	    if(argss[3]!=0 && argss[3]<=read.split("\n").length-1)
	    {
		console.log("StringContaining Marked item as done.");
		if(read.split("\n").length>2)
		{
                   read=read.replace(data,'');
                   read=read.split("\n");
		//    read=read.filter(function(e){return e!=undefined;});
	           read=read.filter(function(e){return e;});
                   read=read.toString();
	           read=read.replace(myregex,"\n")+"\n";
	           fs.writeFile("task.txt",read,(err)=>{if(err) throw(err);});
		}
		else        //if it is empty
		{
                  read='';
		  fs.writeFile("task.txt",read,(err)=>{if(err) throw(err);});
		}
	   }
	   else{    //if index not found
           console.log("StringContaining Error: no incomplete item with index #"+argss[3]+" exists.");
        }
 
	   data=data+"\n";
       if(fs.existsSync("completed.txt"))   //checking if complete,txt is present or not
	   {
           //if it is there append data
		fs.appendFile("completed.txt",data,(err)=>{if (err) throw (err);});
	   }
	   else
	   {
           //otherwise write
		fs.writeFile("completed.txt",data,(err)=>{if (err) throw(err);});
	   }
	}
else    //if no is missing
    {
        console.log("StringContaining Error: Missing NUMBER for marking tasks as done.");
    }
}
//6. Generate a report
const report=()=>
{
	if(fs.existsSync("task.txt"))   //if task file exist
	{
        var read_task=fs.readFileSync("task.txt","utf-8");
        read_task=read_task.split("\n");
        read_task=read_task.filter(function (e) {return e;});
	}
	else
	{
        var read_task=0;
    }
    if(fs.existsSync("completed.txt"))
	{
        var read_completed=fs.readFileSync("completed.txt","utf-8");
        read_completed=read_completed.split("\n");
        read_completed=read_completed.filter(function(e){return e;});
	}
	else
	{
        var read_completed=0;
    }

    //After reading both the files now we will print as per the required formate
    console.log("StringContaining Pending : "+read_task.length);
    if(fs.existsSync("task.txt")){
        var read=fs.readFileSync("task.txt","utf-8");
        read=read.split("\n");
         
        read=read.filter(function(e){return e;});
        
        for(i=0;i<read.length;i++){ //loop to print data of task.txt file
            read[i]=(i+1)+read[i].substr(1,read[i].length); //(i+1) is done here because we are updating the index
            // read[i]=(read[i].join(" "))+".";
            
            console.log(read[i]);
        }
        }
        
	console.log("\nCompleted : "+read_completed.length);

    if(fs.existsSync("completed.txt")){     //if completed txt file exist
        var read=fs.readFileSync("completed.txt","utf-8");
        read=read.split("\n");
         
        read=read.filter(function(e){return e;});
         
        for(i=0;i<read.length;i++){ 
            var read=fs.readFileSync("completed.txt","utf-8");
            read=read.split("\n");
             
            read=read.filter(function(e){return e;});
             
            for(i=0;i<read.length;i++){ //loop to print data of completed.txt file
                read[i]=(i+1)+read[i].substr(1,read[i].length-5);
                // read[i]=(read[i].join(" "))+".";
                
                console.log(read[i]);
            }
        }
        }
}



// 1. Help
const help=()=>{
var text=`StringContaining "Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics"`
console.log(text);}
if(argss.length>2 && commands.indexOf(argss[2])!=-1){
switch(argss[2]){
           case "add":
                  add();
                  break;
           case "del":
                  del();
                  break;
           case "done":
                  completed();
                  break;
           case "ls":
                  ls();
                  break;
           case "report":
                 report();
                  break;
           case "help":
                 help();
                 break;
	case    (''):
                 help();
                 break;               
}
}
else{
	help();}