#include<bits/stdc++.h>
using namespace std;
//Used array for user id and items Number of items is taken 30 as there are 26 alphabets
// Vectors can also be used but with a slight larger time and space complexity
int uid[100];char item[30];
int nu,ni; //nu is number of users, ni is no of items.
vector<set<int>> u_p(30); //For if there is a user for a particular item
int next1[30]; //For the next date of the particluar item startinng from day 0

void print(int u,int nex,char it){
    //for simplicity I am taking each month have 30 days
    //my starting date is 01/01
    cout<<u<<" have booked "<<it<<" from "<<nex%30+1<<"/"<<nex/30+1<<" to "<<(nex+7)%30<<"/"<<(nex+7)/30+1<<"\n";

}

void solve(){
    int user;char items;
    cout<<"Enter User: ";
    cin>>user;
    cout<<"Enter the item to be booked:";
    cin>>items;
    if(u_p[items-'a'].find(user)==u_p[items-'a'].end())
    { // If user has not booked a particular event then book for the user
        u_p[items-'a'].insert(user);
        print(user,next1[items-'a'],items);//Printing the booking details
        next1[items-'a']+=7; //next booking date
    }
    else{
        cout<<"User "<<user<<" can't book the item "<<items<<"\n";
    }
    



}

signed main(){
    ios_base::sync_with_stdio(0);
    //cin.tie(0);cout.tie(0);
    cout<<"Enter total number of users:";
    cin>>nu;
    cout<<"Enter total number of items:";
    cin>>ni;
    // Now though this part is not mentioned in the assignment , I thought this will help to verify the 
    //workability of the code

    //Taking user id input
    cout<<"Enter a list of user id:";
    for(int i=0;i<nu;i++){
        cin>>uid[i];
    }
    
    //taking item input
    cout<<"Enter a list of item id:";
    for(int i=0;i<ni;i++){
        cin>>item[i];
    }

    int t;
    cout<<"Enter the total number of time you want to book:"; // Can be thought of number of test cases
    cin>>t;
    while(t--)
    solve();
    
}