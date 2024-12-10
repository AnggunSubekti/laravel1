/*import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

	    	<div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
	    </div>
        </AuthenticatedLayout>
    );
}
*/

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        media: null, // Menambahkan media ke dalam state form
    });

    // Menangani perubahan pada input teks (message)
    const handleMessageChange = (e) => {
        setData('message', e.target.value);
    };

    // Menangani perubahan pada input file (media)
    const handleFileChange = (e) => {
        setData('media', e.target.files[0]); // Menyimpan file yang dipilih
    };

    // Menangani pengiriman form
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('message', data.message);
        formData.append('media', data.media);

        post(route('chirps.store'), {
            data: formData, // Mengirimkan FormData
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} encType="multipart/form-data"> {/* Menambahkan enctype */}
                    {/* Input untuk pesan */}
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={handleMessageChange}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />

                    {/* Input untuk media (gambar/video) */}
                    <div className="mt-4">
                        <label htmlFor="media" className="block text-sm font-medium text-gray-700">
                            Upload Media (Image/Video)
                        </label>
                        <input
                            type="file"
                            id="media"
                            name="media"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <InputError message={errors.media} className="mt-2" />
                    </div>

                    {/* Tombol submit */}
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

                {/* Menampilkan Chirp yang ada */}
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

