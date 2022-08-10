import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import ParticiparContract from '../../../build/contracts/ParticiparContract.json';
declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthcontractService {
  Participar: any;
  private web3Provider: null;
  private contracts: {
    /*  Participar: {
       abi: ParticiparContract,
       address: '0x7F02a959493110eB12B6EAEec2f0207A2eAeE1ad',
       contract: {}
     } */
  };
  constructor() {
    this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    window.web3 = new Web3(this.web3Provider);
    const _ParticiparContract = window.web3.eth.contract(ParticiparContract.abi);
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    /* console.log(window.web3.eth.accounts[0]); */
    this.Participar = _ParticiparContract.at('0x407A88228d31761BadB0993E8E903C77987308B2');
    /* console.log(Participar); */
    
    console.log('Deberia aparecer los votos');
    console.log(this.Participar.getMiVoto(1));
    console.log(this.Participar.getVotosTotales(1));
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
          Web3.eth.getBalance(account, function (err, balance) {
            if (err === null) {
              return resolve({ fromAccount: account, balance: Web3.fromWei(balance, 'ether') });
            } else {
              return reject('error!');
            }
          });
        }
      });
    });
  }

  crearCuenta() {
    // let a = window.web3.eth.accounts.create();
    // let b = window.web3.personal.newAccount('password').subscribe(data => {
    //   console.log(data);
    // });
    // console.dir(b);
    // console.log(b);
    // return b;
  }
}
