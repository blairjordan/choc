# choc

https://cloud.google.com/sdk/docs/install


```
1 output channel
2 hardware inputs
```

ffmpeg \
  -f alsa \
  -i hw:2 \
  -t 5 \
  -sample_rate 16000 \
  -ac 1 \
  out.flac