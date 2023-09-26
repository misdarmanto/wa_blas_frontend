import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
  useActionData
} from '@remix-run/react'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/router'
import { API } from '~/services/api'
import { checkSession } from '~/services/session'
import { CONFIG } from '~/config'
import { Breadcrumb } from '~/components/breadcrumb'
import type { ISessionModel } from '~/models/sessionModel'
import type { IWaBlasUserCategoryModel, IWaBlasUserModel } from '~/models/waBlasModel'

export let loader: LoaderFunction = async ({ params, request }) => {
  const session: any = await checkSession(request)
  if (!session) return redirect('/login')
  try {
    const result = await API.get(
      session,
      CONFIG.baseUrlApi + `/wa-blas-users-categories/list`
    )
    return {
      categories: result.items,
      session: session,
      isError: false
    }
  } catch (error: any) {
    console.log(error)
    return { ...error, isError: true }
  }
}

export let action: ActionFunction = async ({ request }) => {
  const session: ISessionModel | any = await checkSession(request)
  if (!session) return redirect('/login')

  const formData = await request.formData()
  try {
    if (request.method == 'POST') {
      const payload: IWaBlasUserModel | any = {
        waBlasUserName: formData.get('waBlasUserName'),
        waBlasUserWhatsappNumber: formData.get('waBlasUserWhatsappNumber'),
        waBlasUserCategoryId: formData.get('waBlasUserCategoryId')
      }
      await API.post(session, CONFIG.baseUrlApi + '/wa-blas-users', payload)
      return redirect('/wa-blas-users')
    }
    return { isError: false, request }
  } catch (error: any) {
    console.log(error)
    return { ...error, isError: true }
  }
}

export default function Index() {
  const navigation = [{ title: 'Create', href: '', active: true }]
  const loader = useLoaderData()
  const categories = loader.categories as IWaBlasUserCategoryModel[]
  const submit = useSubmit()
  const transition = useTransition()
  const actionData = useActionData()

  console.log(loader)
  if (loader.isError) {
    return (
      <h1 className="text-center font-bold text-3xl text-red-600">
        {loader.error?.messsage || `error ${loader.code ?? ''}`}
      </h1>
    )
  }

  // const formKey = 'formKey'

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    submit(e.currentTarget, {
      method: 'post',
      action: `/wa-blas-users/create`
    })
  }

  return (
    <div className="">
      <Breadcrumb title="Wa Blas User" navigation={navigation} />

      {actionData?.isError && (
        <div className="p-4 my-5 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">Error</span> {actionData.message}
        </div>
      )}

      <Form method={'post'} onSubmit={submitData} className="bg-white rounded-xl p-10">
        <div className="w-full md:mr-2">
          <div className="my-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">nama</label>
            <input
              name="waBlasUserName"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="nama..."
            />
          </div>
          <div className="my-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">WA</label>
            <input
              name="waBlasUserWhatsappNumber"
              type="tel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="082212312321"
            />
          </div>
          <div className="my-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              name="waBlasUserCategoryId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={categories[0].waBlasUserCategoryId}
            >
              {categories.map((item) => (
                <option
                  key={item.waBlasUserCategoryId}
                  defaultValue={item.waBlasUserCategoryId}
                >
                  {item.waBlasUserCategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex justify-center w-32 rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm"
          >
            {transition?.submission ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </Form>
    </div>
  )
}
