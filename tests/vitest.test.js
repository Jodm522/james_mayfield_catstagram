import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import PostList from './PostList.vue'
import {actions} from '../src/store/auth/actions'

test('should work as expected', () => {
    expect(Math.sqrt(4)).toBe(2)
  })

  describe("uploadComment",()=>{
    it('Uploaded a comment', async()=>{
        const commit = jest.fn()
        const text = "Test text"
        const entry = 4
        await actions.uploadComment({commit}, {text, entry})
        expect(url).toBe('http://catstagram.lofty.codes/api/comments/')
        expect(body).toEqual({text, entry})
    }) 

  })