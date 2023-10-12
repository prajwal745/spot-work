export default class Collection {
  store: {
    id: string;
    value: string;
    done: boolean;
  }[]

  constructor(){
    this.store = []
  }

  getStore(){
    return this.store
  }

  setStore(id: string, value: string, done: boolean){
    this.store.push({id, value, done})
  }

  updateStore(id: string, value: string, done: boolean){
    const index = this.store.findIndex(item => item.id === id)
    this.store[index] = {id, value, done}
  }

  deleteValue(id: string){
    const index = this.store.findIndex(item => item.id === id)
    this.store.splice(index, 1)
  }
  // clearAll() {
  //   this.store = []
  // }
}
