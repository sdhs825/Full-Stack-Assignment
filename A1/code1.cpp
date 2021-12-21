#include<bits/stdc++.h>
using namespace std;

signed main(){

    srand(time(0));
    string name;
    cout << "Enter your name: ";
    getline(cin,name);
    cout<<"ID: "<<rand()<<"\n";
    cout<<"Name: "<<name<<"\n";
    time_t my_time = time(NULL);
    string t=ctime(&my_time);
    cout<<"Date: "<<t.substr(8,2)<<" "<<t.substr(4,3)<<" "<<t.substr(20,4)<<"\n";
    cout<<"Time(HH:MM:SS): "<<t.substr(11,8) <<"\n";
}