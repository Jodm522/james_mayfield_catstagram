import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import {fs} from 'file-system';
import actions from '../src/store/auth/actions'
// import FileReader from
const testImage = `../src/assets/images/loss.jpg`

test('should work as expected', () => {
    expect(Math.sqrt(4)).toBe(2)
  })


  let url = ''
let body = {}

jest.mock("axios", () => ({
  __esModule: true,
  post: (_url, _body) => { 
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
    
  },
    default:  (_url, _body) => { 
      return new Promise((resolve) => {
        url = _url
        body = _body
        resolve(true)
      })
      
    },
    
}))

  describe("uploadComment",()=>{
    it('Uploads comments correctly', async()=>{
        const commit = jest.fn()
        const text = "Test text"
        const entry = 4
        await actions.uploadComment({commit}, {text, entry})
        expect(url.url).toBe('http://catstagram.lofty.codes/api/comments/')
        expect(url.data).toEqual({text, entry})
        expect(url.method).toBe('post')
      }) 

  })
  

  describe("signup",()=>{
    it('Signs a user up', async()=>{
      const commit = jest.fn()
      const email = "test@test.com"
      const password = "testPassword"
      const firstName = "Pepe"
      const lastName = "Silvia"

      await actions.signup({commit}, {email, password, firstName,lastName})
      expect(url.url).toBe('http://catstagram.lofty.codes/api/users/')
      expect(url.data).toEqual({email,password,first_name:firstName,last_name:lastName})
    })
  })


  const testImg = fs.createReadStream(testImage)
  describe("postImage",()=>{
    it("Posts an image", async()=>{
      const commit = jest.fn()
      const name = "Test name"
      const image = testImg
      
      await actions.upload({commit}, {name,image})
      expect (url.url).toBe('http://catstagram.lofty.codes/api/posts/')
      expect (FileReader.readAsDataURL(url.data)).toBe(name)
    })
  })