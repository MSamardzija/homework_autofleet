export default function Divider({ text }: { text: string }) {
  return (
    <div className='flex items-center text-lg my-6 text-gray-700'>
      <span className='flex-1 h-px bg-gray-300 mx-2' />
      {text}
      <span className='flex-1 h-px bg-gray-300 mx-2' />
    </div>
  );
}
