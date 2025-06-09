import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Monitor, Eye, Maximize } from 'lucide-react';

const WebAR = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-16">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center gap-3 p-4 glass-card rounded-2xl text-purple-400 mx-auto mb-4">
            <Eye className="h-8 w-8" />
            <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">
              机房AR地图体验
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            通过WebAR技术，沉浸式探索3D机房环境，了解设备布局和网络架构
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              <Monitor className="mr-1 h-3 w-3" />
              3D可视化
            </Badge>
            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
              <Maximize className="mr-1 h-3 w-3" />
              AR体验
            </Badge>
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              交互式学习
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div className="sketchfab-embed-wrapper absolute inset-0">
              <iframe 
                title="Comms Room 2" 
                frameBorder="0" 
                allowFullScreen 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true" 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                xr-spatial-tracking="true"
                execution-while-out-of-viewport="true"
                execution-while-not-rendered="true"
                web-share="true"
                src="https://sketchfab.com/models/404f7f36395f481091144083219dac0d/embed?autostart=1&camera=0&annotations_visible=1&ui_infos=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0"
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
            <p className="text-sm text-muted-foreground text-center">
              <a 
                href="https://sketchfab.com/3d-models/comms-room-2-404f7f36395f481091144083219dac0d" 
                target="_blank" 
                rel="nofollow" 
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Comms Room 2
              </a>
              {' '}by{' '}
              <a 
                href="https://sketchfab.com/Giimann" 
                target="_blank" 
                rel="nofollow" 
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Giimann
              </a>
              {' '}on{' '}
              <a 
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=404f7f36395f481091144083219dac0d" 
                target="_blank" 
                rel="nofollow" 
                className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sketchfab
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebAR;