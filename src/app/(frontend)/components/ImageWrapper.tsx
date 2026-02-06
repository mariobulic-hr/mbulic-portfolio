import Image from 'next/image'

export default function ImageWrapper({
  image,
  width,
  height,
}: {
  image: { url: string; alt: string }
  width: number
  height: number
}) {
  return <Image src={image.url} alt={image.alt} width={width} height={height} />
}
